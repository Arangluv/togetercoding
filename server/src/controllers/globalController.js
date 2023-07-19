import nodemailer from "nodemailer";
import crypto from "crypto";
import Student from "../models/Student";
const generateEmailVerificationToken = () => {
  const token = crypto.randomBytes(20).toString("hex");
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 5);
  return { token, expires };
};
export const postJoin = async (req, res) => {
  console.log("Data ?");
  console.log(req.body);
  console.log(process.env.NAVER_MAIL_PASSWORD);
  const { nickname, name, email } = req.body;
  // 인증이메일 전송
  try {
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
          message: `Failed to send authentication email to ruhunsu3@naver.com`,
        });
      } else {
        return res.status(200).json({
          message: `Authentication mail is sent to ruhunsu3@naver.com`,
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
  console.log(req.query);
  console.log("ㅇㅇ???");
  try {
    const { email, token, expires } = req.query;
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
      await student.savwe();
      return res.status(200).json({ message: "회원가입에 성공했습니다" });
    }
    return res.status(404).redirect("http://localhost:3000");
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "잘못된 접근입니다" });
  }
};
