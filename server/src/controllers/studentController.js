import Student from "../models/Student";
import AWS from "aws-sdk";
import Lecture from "../models/Lecture";
import Purchase from "../models/Purchase";

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

export const postBuyLecture = async (req, res) => {
  try {
    if (!req.session) {
      return res.status(404).send();
    }
    const { email, lectureId } = req.body;

    // req.session.user => user: { id: '64bf7bde52ce694ab1eef4a0', name: '류현수', authorized: true }
    const buyer = await Student.findOne({
      _id: req.session.user.id,
      name: req.session.user.name,
      email,
    });
    if (!buyer) {
      return res.status(404).send();
    }
    const lecture = await Lecture.findOne({ _id: lectureId });
    if (!lecture) {
      console.log("야기?");
      return res.status(404).send();
    }

    const isAlreadyPurchased = await Purchase.exists({
      buyer: buyer._id,
      course: lecture._id,
    });
    if (isAlreadyPurchased) {
      // 이미 구매했으므로 lecture page로 redirect 시켜주어야함
      return res.status(200).redirect("http://localhost:3000/");
    }
    await Purchase.create({
      buyer: buyer._id,
      course: lecture._id,
    });
    return res.status(200).json({ message: "임시 성공~" });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "상품을 구매하는데 문제가 발생했습니다" });
  }
};
