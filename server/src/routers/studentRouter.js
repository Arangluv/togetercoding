import express from "express";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { postBuyLecture, postChangeProfile } from "../controllers/studentController";

AWS.config.update({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
});
const s3 = new AWS.S3();
const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: "togethercoding", // 생성한 버킷 이름을 적어주세요.
    key: (req, file, callback) => {
      const uploadDirectory = req.query.directory ?? ""; // 업로드할 디렉토리를 설정하기 위해 넣어둔 코드로, 없어도 무관합니다.
      callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`);
    },
    acl: "public-read-write",
  }),
});
const studentRouter = express.Router();

studentRouter
  .route("/change-profile")
  .post(imageUploader.single("profileImage"), postChangeProfile);

studentRouter.route("/buy-lectures").post(postBuyLecture);

export default studentRouter;
