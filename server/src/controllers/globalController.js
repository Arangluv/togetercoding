import nodemailer from "nodemailer";
import crypto from "crypto";
import Student from "../models/Student";
import { accessTokenConfig, refreshTokenConfig } from "../config/jwtConfig";
import jwt from "jsonwebtoken";
import { cookiesConfig } from "../config/cookieConfig";
const generateEmailVerificationToken = () => {
  const token = crypto.randomBytes(20).toString("hex");
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 5);
  return { token, expires };
};
export const postJoin = async (req, res) => {
  // 인증이메일 전송
  try {
    const { nickname, name, email } = req.body;
    const smtpTransport = nodemailer.createTransport({
      service: "naver",
      host: "smtp.naver.com", // SMTP 서버명
      port: 465, // SMTP 포트
      auth: {
        user: "ruhunsu3@naver.com", // mail 발송 이메일 주소
        pass: "ru09457295$#", // 해당 이메일 비밀번호
      },
    });

    const { token, expires } = generateEmailVerificationToken();
    const mailOptions = {
      from: "ruhunsu3@naver.com", // 발송 주체
      to: "ruhunsu3@naver.com", // 인증을 요청한 이메일 주소
      subject: "[together Coding] 회원가입 이메일 확인 안내", // 이메일 제목
      html: `<p>아래 링크를 눌러 이메일 인증을 완료해주세요!</p>
      <p><a href="http://localhost:4000/email-varification/?email=${email}&token=${token}&expires=${expires}">이메일 인증완료하기</a></p>
      <p>링크는 5분 후 만료됩니다</p>`, // 이메일 내용
    };
    // Duplication Inspect
    const emailExist = await Student.exists({ email });
    const nicknameExist = await Student.exists({ nickname });
    if (nicknameExist) {
      return res.status(404).json({ message: "닉네임이 이미 존재합니다" });
    }
    if (emailExist) {
      const student = await Student.findOne({ email });
      if (student.joinState.approve) {
        return res.status(404).json({ message: "이미 가입된 이메일입니다" });
      }
      student.joinState.token = token;
      student.joinState.expires = expires;
      await student.save();
      smtpTransport.sendMail(mailOptions, (error, responses) => {
        if (error) {
          res.status(500).json({
            message: `이메일을 보내는데 실패했습니다`,
          });
        } else {
          return res.status(200).json({
            message: `Authentication mail is sent to ${email}`,
          });
        }
        smtpTransport.close();
        return res.status(500).send();
      });
    }
    // 이메일이 존재하지않는 신규유저
    // Create Student with not yet approve join
    await Student.create({
      email,
      name,
      nickname,
      joinState: {
        approve: false,
        token: token,
        expires,
      },
    });

    smtpTransport.sendMail(mailOptions, (error, responses) => {
      if (error) {
        res.status(500).json({
          message: `이메일을 보내는데 실패했습니다`,
        });
      } else {
        return res.status(200).json({
          message: `Authentication mail is sent to ${email}`,
        });
      }
      smtpTransport.close();
    });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "이메일을 발송하는데 오류가 발생했습니다" });
  }
};

export const getEmailVerification = async (req, res) => {
  try {
    const { email, token } = req.query;
    const student = await Student.findOne({ email });
    const nowDate = new Date();
    if (!student) {
      return res.status(404).json({ message: "잘못된 접근입니다" });
    }
    if (
      student.joinState.token === token &&
      student.joinState.expires > nowDate
    ) {
      student.joinState.approve = true;
      await student.save();
      const { acceessSecretKey, accessOptions } = accessTokenConfig;
      const { refreshSecretKey, refreshOptions } = refreshTokenConfig;
      const payload = {
        id: student._id,
      };
      const accessToken = jwt.sign(payload, acceessSecretKey, accessOptions);
      const refreshToken = jwt.sign(payload, refreshSecretKey, refreshOptions);
      const cookieConfig = cookiesConfig();
      return res
        .cookie("token", { accessToken, refreshToken }, { ...cookieConfig })
        .status(200)
        .redirect("http://localhost:3000");
    }
    return res.status(404).redirect("http://localhost:3000");
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "잘못된 접근입니다" });
  }
};

export const tokenInspect = async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const { acceessSecretKey } = accessTokenConfig;
    const userInfo = await jwt.verify(accessToken, acceessSecretKey);
    const { id } = userInfo;
    const student = await Student.findById(id);
    return res.status(200).json({
      name: student.name,
      nickname: student.nickname,
      profileImg: student.profileImg,
      email: student.email,
    });
  } catch (error) {
    // error.name -> 만료시 에러이름 : TokenExpiredError, 유효하지 않은 토큰 : JsonWebTokenError
    if (error.name === "TokenExpiredError") {
      console.log("토큰만료 ?");
      // 토큰 만료 시
      return res.status(404).json({ errorCode: 1 }); // TODO clearCookie
    }
    console.log("invaild token ?");
    return res
      .cookie("token", { maxAge: 0 })
      .status(404)
      .json({ errorCode: -1 }); // 유효하지 않은 토큰, TODO clearCookie
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies.token;
    const { refreshSecretKey } = refreshTokenConfig;
    const userInfo = await jwt.verify(refreshToken, refreshSecretKey);
    const { id } = userInfo;
    const { acceessSecretKey, accessOptions } = accessTokenConfig;
    const payload = {
      id,
    };
    const accessToken = jwt.sign(payload, acceessSecretKey, accessOptions);
    const cookieConfig = cookiesConfig();
    const student = await Student.findById(id);

    return res
      .status(200)
      .cookie("token", { accessToken, refreshToken }, { ...cookieConfig })
      .json({
        name: student.name,
        nickname: student.nickname,
        profileImg: student.profileImg,
        email: student.email,
      });
  } catch (error) {
    // refresh token마저도 invalid한 경우 처리 -> 다시 로그인 -> ####이거 수정해야함###
    return res
      .cookie("token", { maxAge: 0 })
      .status(404)
      .json({ message: "다시 로그인해주세요" });
  }
};

export const removeToken = async (req, res) => {
  return res
    .clearCookie("token")
    .status(200)
    .json({ message: "token remove ok!" });
};

export const postLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "가입된 이메일이 없습니다" });
    }

    // 인증이메일 전송
    const smtpTransport = nodemailer.createTransport({
      service: "naver",
      host: "smtp.naver.com", // SMTP 서버명
      port: 465, // SMTP 포트
      auth: {
        user: "ruhunsu3@naver.com", // mail 발송 이메일 주소
        pass: "ru09457295$#", // 해당 이메일 비밀번호
      },
    });

    const { token, expires } = generateEmailVerificationToken();
    student.joinState.token = token;
    student.joinState.expires = expires;
    await student.save();
    
    const mailOptions = {
      from: "ruhunsu3@naver.com", // 발송 주체
      to: "ruhunsu3@naver.com", // 인증을 요청한 이메일 주소
      subject: "[Together Coding] 로그인 이메일 확인 안내", // 이메일 제목
      html: `<p>아래 링크를 눌러 이메일 인증을 완료해주세요!</p>
      <p><a href="http://localhost:4000/email-login-varification/?email=${email}&token=${token}&expires=${expires}">이메일 인증완료하기</a></p>
      <p>링크는 5분 후 만료됩니다</p>`, // 이메일 내용
    };

    smtpTransport.sendMail(mailOptions, (error, responses) => {
      if (error) {
        res.status(500).json({
          message: `이메일을 보내는데 실패했습니다`,
        });
      } else {
        return res.status(200).json({
          message: `Authentication mail is sent to ${email}`,
        });
      }
      smtpTransport.close();
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "로그인을 하는데 문제가 발생했습니다" });
  }
};

export const getLoginEmailVerification = async (req, res) => {
  try {
    const { email, token } = req.query;
    const student = await Student.findOne({ email });
    const nowDate = new Date();
    if (!student) {
      return res.status(404).json({ message: "잘못된 접근입니다" });
    }
    if (
      student.joinState.token === token &&
      student.joinState.expires > nowDate
    ) {
      const { acceessSecretKey, accessOptions } = accessTokenConfig;
      const { refreshSecretKey, refreshOptions } = refreshTokenConfig;
      const payload = {
        id: student._id,
      };
      const accessToken = jwt.sign(payload, acceessSecretKey, accessOptions);
      const refreshToken = jwt.sign(payload, refreshSecretKey, refreshOptions);
      const cookieConfig = cookiesConfig();
      return res
        .cookie("token", { accessToken, refreshToken }, { ...cookieConfig })
        .status(200)
        .redirect("http://localhost:3000");
    }
    return res.status(404).redirect("http://localhost:3000");
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "잘못된 접근입니다" });
  }
};
