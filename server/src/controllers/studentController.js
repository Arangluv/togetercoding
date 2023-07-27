import Student from "../models/Student";
import { accessTokenConfig, refreshTokenConfig } from "../config/jwtConfig";
import jwt from "jsonwebtoken";
import { cookiesConfig } from "../config/cookieConfig";
import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
});
const s3 = new AWS.S3();
export const postChangeProfile = async (req, res) => {
  // console.log("req.file");
  // console.log(req.file);
  // console.log("req.body");
  // console.log(req.body);
  // console.log("req.query");
  // console.log(req.query.directory);
  const { nickname, name, email } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (!student) {
      throw new Error("회원정보 수정 중 오류가 발생했습니다");
    }
    // delete profile image at S3 bucket
    if (
      req.file &&
      student.profileImg !== null &&
      !student.profileImg.includes("k.kakaocdn.net")
    ) {
      // 기존 프로필 사진을 S3에서 지운다
      // 조건은 s3에 파일이 올라와 있어야한다.
      // 즉 바꿀려는 파일이 있고, profileImg가 null이 아니고, null이 아닐때 profileImg에 k.kakaocdn.net가 포함되어 있으면 안된다.
      await s3.deleteObject(
        {
          Bucket: "togethercoding",
          Key: student.profileImg,
        },
        (err, data) => {
          if (err) throw err;
        }
      );
    }
    // change student profile
    student.name = name;
    student.nickname = nickname;
    student.profileImg = req.file.location;
    await student.save();
    return res
      .status(200)
      .json({ message: "회원정보를 성공적으로 수정했습니다" });
  } catch (error) {
    return res.status(400).json({
      message: "회원정보를 수정하는데 문제가 발생했습니다 " + error.name,
    });
  }
};
