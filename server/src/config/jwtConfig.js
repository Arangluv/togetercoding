import dotenv from "dotenv";

dotenv.config();
export const accessTokenConfig = {
  acceessSecretKey: process.env.JWT_ACCESS_SECRET_KEY, // 원하는 시크릿 키
  accessOptions: {
    algorithm: "HS256", // 해싱 알고리즘
    expiresIn: "1m", // 토큰 유효 기간
    issuer: "togethercoding", // 발행자
  },
};

export const refreshTokenConfig = {
  refreshSecretKey: process.env.JWT_REFRESH_SECRET_KEY, // 원하는 시크릿 키
  refreshOptions: {
    algorithm: "HS256", // 해싱 알고리즘
    expiresIn: "12d", // 토큰 유효 기간
    issuer: "togethercoding", // 발행자
  },
};
