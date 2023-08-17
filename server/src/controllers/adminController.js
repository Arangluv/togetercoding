import Student from "../models/Student";
import { accessTokenConfig, refreshTokenConfig } from "../config/jwtConfig";
import jwt from "jsonwebtoken";
import { cookiesConfig } from "../config/cookieConfig";
import AWS from "aws-sdk";

export const tokenCheck = async (req, res) => {
  try {
    if (!req.session) {
      return res.status(404).send();
    }
    const id = req.session.user.id;
    const sessionId = req.session.id;
    const student = await Student.findById(id);
    console.log("student");
    console.log(student);
    if (
      student.name === process.env.ADMIN_NAME &&
      student.nickname === process.env.ADMIN_NICKNAME &&
      student.email === process.env.ADMIN_EMAIL
    ) {
      return res.status(200).json({ code: process.env.ADMIN_CODE });
    }
    // admin이 아닌 다른 유저가 패널에 접속
    // 심각한 문제
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
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // 토큰 만료 시
      return res.status(404).json({ errorCode: 1 }); // TODO clearCookie
    }
    return res.clearCookie("connect.sid").status(404).json({ errorCode: -1 }); // 유효하지 않은 토큰, TODO clearCookie
  }
};

export const refreshTokenInspect = async (req, res) => {
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
    if (
      student.name === process.env.ADMIN_NAME &&
      student.nickname === process.env.ADMIN_NICKNAME &&
      student.email === process.env.ADMIN_EMAIL
    ) {
      return res
        .cookie("token", { accessToken, refreshToken }, { ...cookieConfig })
        .status(200)
        .json({ code: process.env.ADMIN_CODE });
    }
    throw new Error("invalid access");
  } catch (error) {
    // errorCode = -2 -> refresh token이 만료된 경우
    if (error.name === "TokenExpiredError") {
      return res
        .cookie("token", { maxAge: 0 })
        .status(404)
        .json({ errorCode: -2 });
    }
    return res
      .cookie("token", { maxAge: 0 })
      .status(404)
      .json({ errorCode: -1 });
  }
};
