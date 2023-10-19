import nodemailer from "nodemailer";
import crypto from "crypto";
import Student from "../models/Student";
import { accessTokenConfig, refreshTokenConfig } from "../config/jwtConfig";
import jwt from "jsonwebtoken";
import { cookiesConfig } from "../config/cookieConfig";
import axios from "axios";
import MongoStore from "connect-mongo";
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
        pass: "ru09457295#@", // 해당 이메일 비밀번호
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
      return res.status(404).json({ message: "이미 가입된 이메일입니다" });
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
      // 만료시간도 지켰고, query를 통해 보내준 토큰이 일치하면
      // 원래는 accessToken을 발급
      if (!req.session.user) {
        req.session.user = {
          id: student._id,
          name: student.name,
          authorized: true,
        };
        student.session = req.session.id;
        student.joinState.approve = true;
        await student.save();
        req.session.save((err) => {
          if (err) {
            throw new Error();
          }
          res.status(200).redirect("http://localhost:3000");
        });
      }
      return;
    }
    console.log("redirect에서 문제 발생");
    return res.status(404).redirect("http://localhost:3000");
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "잘못된 접근입니다" });
  }
};

export const tokenInspect = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(200).json({ message: "로그인 되어 있지 않습니다" });
    }
    console.log("token inspect");
    console.log("req.session");
    console.log(req.session);
    // req.session.user 에는 name과 id
    const student = await Student.findOne({
      _id: req.session.user.id,
      session: req.session.id,
    });

    const sid = req.session.id; // session id
    if (!student) {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          throw new Error("???");
        }

        const store = new MongoStore({
          mongoUrl: "mongodb://127.0.0.1:27017/togethercoding",
        });
        store.destroy(sid, (err) => {
          if (err) {
            console.error("Error destroying session in MongoDB:", err);
          }
        });
      });

      return res
        .clearCookie("connect.sid")
        .status(200)
        .json({ message: "로그아웃했습니다" });
    } else {
      return res.status(200).json({
        name: student.name,
        nickname: student.nickname,
        profileImg: student.profileImg,
        email: student.email,
      });
    }
  } catch (error) {
    console.log(error);
    // error.name -> 만료시 에러이름 : TokenExpiredError, 유효하지 않은 토큰 : JsonWebTokenError
    return res.clearCookie("connect.sid").status(404).json({ errorCode: -1 }); // 유효하지 않은 토큰, TODO clearCookie
  }
};

export const postLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "가입된 이메일이 없습니다" });
    }
    if (student.socialOnly) {
      return res
        .status(404)
        .json({ message: "해당 이메일을 카카오톡 로그인으로 로그인해주세요" });
    }
    // 인증이메일 전송

    const smtpTransport = nodemailer.createTransport({
      service: "naver",
      host: "smtp.naver.com", // SMTP 서버명
      port: 465, // SMTP 포트
      auth: {
        user: "ruhunsu3@naver.com", // mail 발송 이메일 주소
        pass: "ru09457295#@", // 해당 이메일 비밀번호
      },
    });
    // 이메일 인증 토큰과 만료시간을 받아옴
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
        console.log(error);
        throw new Error();
      } else {
        smtpTransport.close();
        return res.status(200).json({
          message: `Authentication mail is sent to ${email}`,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "로그인을 하는데 문제가 발생했습니다" });
  }
};
// export const postLogin = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const student = await Student.findOne({ email });
//     if (!student) {
//       return res.status(404).json({ message: "가입된 이메일이 없습니다" });
//     }

//     // 인증이메일 전송
//     const smtpTransport = nodemailer.createTransport({
//       service: "naver",
//       host: "smtp.naver.com", // SMTP 서버명
//       port: 465, // SMTP 포트
//       auth: {
//         user: "ruhunsu3@naver.com", // mail 발송 이메일 주소
//         pass: "ru09457295$#", // 해당 이메일 비밀번호
//       },
//     });

//     const { token, expires } = generateEmailVerificationToken();
//     student.joinState.token = token;
//     student.joinState.expires = expires;
//     await student.save();

//     const mailOptions = {
//       from: "ruhunsu3@naver.com", // 발송 주체
//       to: "ruhunsu3@naver.com", // 인증을 요청한 이메일 주소
//       subject: "[Together Coding] 로그인 이메일 확인 안내", // 이메일 제목
//       html: `<p>아래 링크를 눌러 이메일 인증을 완료해주세요!</p>
//       <p><a href="http://localhost:4000/email-login-varification/?email=${email}&token=${token}&expires=${expires}">이메일 인증완료하기</a></p>
//       <p>링크는 5분 후 만료됩니다</p>`, // 이메일 내용
//     };

// smtpTransport.sendMail(mailOptions, (error, responses) => {
//   if (error) {
//     res.status(500).json({
//       message: `이메일을 보내는데 실패했습니다`,
//     });
//   } else {
//     return res.status(200).json({
//       message: `Authentication mail is sent to ${email}`,
//     });
//   }
//   smtpTransport.close();
// });
//   } catch (error) {
//     return res
//       .status(404)
//       .json({ message: "로그인을 하는데 문제가 발생했습니다" });
//   }
// };

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
      // 만료시간도 지켰고, query를 통해 보내준 토큰이 일치하면
      // 원래는 accessToken을 발급
      if (!student.joinState.approve) {
        student.joinState.approve = true;
      }

      if (!req.session.user) {
        req.session.user = {
          id: student._id,
          name: student.name,
          authorized: true,
        };
        student.session = req.session.id;
        await student.save();
        req.session.save((err) => {
          if (err) {
            throw new Error();
          }
          res.status(200).redirect("http://localhost:3000");
        });
      }
      return;
    }
    return res.status(404).redirect("http://localhost:3000?valid=false");
  } catch (error) {
    console.log("redirect에서 문제 발생 - 캐치에서 받음");
    console.log(error);
    return res.status(404).redirect("http://localhost:3000");
  }
};
const getKakaoToken = async (token) => {
  const url = "https://kauth.kakao.com/oauth/token";
  const params = {
    grant_type: "authorization_code",
    client_id: process.env.KAKAO_API,
    redirect_uri: "http://localhost:3000/kakao-login",
    code: token,
  };
  try {
    const response = await axios.post(url, null, {
      params,
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    console.log("getKakaoToken에서 response data ?");
    console.log(response.data);
    // ex)

    // {
    //   access_token: 'tCx08EzX2A37vh3DnmLeFCLF0aRfhv1-eX8ZReF7CiolUAAAAYoCc9ps',
    //   token_type: 'bearer',
    //   refresh_token: 'jtrUYoKw9gNYmjTKyx33lVdscy9YfPfW15O-xD1iCiolUAAAAYoCc9pr',
    //   expires_in: 21599,
    //   scope: 'account_email profile_image profile_nickname',
    //   refresh_token_expires_in: 5183999
    // }
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("카카오 로그인에서 토큰을 받아오는데 실패했습니다");
  }
};
const getKakaoInfo = async (token) => {
  const url = "https://kapi.kakao.com/v2/user/me";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(url, config);
    console.log("getKakaoInfo에서 response data?");
    console.log(response.data);
    // ex)

    // {
    //   id: 2929886205,
    //   connected_at: '2023-07-24T04:02:09Z',
    //   properties: {
    //     nickname: '류현수',
    //     profile_image: 'http://k.kakaocdn.net/dn/CXyVh/btsooKzDcuh/Y8KzJcw7CDplOEdkSOmQik/img_640x640.jpg',
    //     thumbnail_image: 'http://k.kakaocdn.net/dn/CXyVh/btsooKzDcuh/Y8KzJcw7CDplOEdkSOmQik/img_110x110.jpg'
    //   },
    //   kakao_account: {
    //     profile_nickname_needs_agreement: false,
    //     profile_image_needs_agreement: false,
    //     profile: {
    //       nickname: '류현수',
    //       thumbnail_image_url: 'http://k.kakaocdn.net/dn/CXyVh/btsooKzDcuh/Y8KzJcw7CDplOEdkSOmQik/img_110x110.jpg',
    //       profile_image_url: 'http://k.kakaocdn.net/dn/CXyVh/btsooKzDcuh/Y8KzJcw7CDplOEdkSOmQik/img_640x640.jpg',
    //       is_default_image: false
    //     },
    //     has_email: true,
    //     email_needs_agreement: false,
    //     is_email_valid: true,
    //     is_email_verified: true,
    //     email: 'ruhunsu3@gmail.com'
    //   }
    // }
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("사용자 정보를 받아오는데 문제가 발생했습니다");
  }
};
export const postKakaoLogin = async (req, res) => {
  const { loginToken } = req.body;
  try {
    const { access_token } = await getKakaoToken(loginToken);
    const { id, kakao_account } = await getKakaoInfo(access_token);

    const { nickname, profile_image_url } = kakao_account.profile;
    const { email } = kakao_account;
    const student = await Student.findOne({ email: kakao_account.email });
    if (!student) {
      //회원가입을 진행
      const student = await Student.create({
        name: nickname,
        nickname: `${nickname}_${id}`,
        email,
        profileImg: profile_image_url,
        socialOnly: true,
        joinState: {
          approve: true,
          token: null,
        },
      });
      if (!req.session.user) {
        req.session.user = {
          id: student._id,
          name: student.name,
          authorized: true,
        };
        student.session = req.session.id;
        await student.save();
        req.session.save((err) => {
          if (err) {
            throw new Error();
          }
          res.status(200).json({
            name: student.name,
            nickname: student.nickname,
            profileImg: student.profileImg,
            email: student.email,
          });
        });
      }
      return;
    }

    if (!req.session.user) {
      req.session.user = {
        id: student._id,
        name: student.name,
        authorized: true,
      };
      student.session = req.session.id;
      await student.save();
      req.session.save((err) => {
        if (err) {
          throw new Error();
        }
      });
    }

    return res.status(200).json({
      name: student.name,
      nickname: student.nickname,
      profileImg: student.profileImg,
      email: student.email,
    });
  } catch (error) {
    console.log("에러가 발생했구나");
    console.log(error);
  }
};

export const postLogout = async (req, res) => {
  try {
    if (req.session.user) {
      const logoutId = req.session.user.id;
      const sessionId = req.session.id;
      const student = await Student.findById(logoutId);
      student.session = "";
      await student.save();

      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          throw new Error("???");
        }

        const store = new MongoStore({
          mongoUrl: "mongodb://127.0.0.1:27017/togethercoding",
        });
        store.destroy(sessionId, (err) => {
          if (err) {
            console.error("Error destroying session in MongoDB:", err);
          }
        });
        return res
          .clearCookie("connect.sid")
          .status(200)
          .json({ message: "로그아웃했습니다" });
      });
    } else {
      throw new Error("??");
    }
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "로그아웃 하는데 문제가 발생했습니다." });
  }
};

export const postReceiveAgainEmailVerification = async (req, res) => {
  postLogin();
};
