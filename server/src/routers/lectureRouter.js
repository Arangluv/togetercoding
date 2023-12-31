import express from "express";
import {
  deleteMainTheme,
  deleteSubLecture,
  getAllComment,
  getAllIssue,
  getAllLecture,
  getComment,
  getIssue,
  getLectureList,
  getLectureProgressState,
  getLectureTitle,
  getListenLecture,
  getMainLecture,
  getPurchaseLectureInfo,
  getSubLecture,
  postComment,
  postIssue,
  postIssueReply,
  postMakeLecture,
  postMakeMainTheme,
  postMakeSubTheme,
  postReply,
  putLectureComplete,
} from "../controllers/lectureController";
import { isPurchase, onlyLoginAccess } from "../middleware/auth";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

AWS.config.update({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
});
const s3 = new AWS.S3();
const lectureRouter = express.Router();
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const localUpload = multer({ storage: storage });

lectureRouter.route("/all-lecture").get(getAllLecture);
lectureRouter
  .route("/make-lecture")
  .post(imageUploader.single("lecture-thumbnail"), postMakeLecture);
lectureRouter.route("/main-lectures").get(getMainLecture);
lectureRouter.route("/main-theme").post(postMakeMainTheme);
lectureRouter.route("/sub-theme").post(
  localUpload.single("lectureVideo"),
  // imageUploader.single("lectureVideo"),
  postMakeSubTheme
);
lectureRouter.route("/delete-maintheme").delete(deleteMainTheme);
lectureRouter.route("/sub-lectures").get(getSubLecture);
lectureRouter.route("/delete-sub-lecture").delete(deleteSubLecture);
lectureRouter.route("/listen-lectures").get(getListenLecture);

// 학생들이 구매한 강의를 클릭
lectureRouter
  .route("/lecture-title")
  .get(onlyLoginAccess, isPurchase, getLectureTitle);
lectureRouter
  .route("/lecture-list")
  .get(onlyLoginAccess, isPurchase, getLectureList);
lectureRouter.route("/complete-lecture").put(putLectureComplete);
lectureRouter.route("/comments").post(postComment);
lectureRouter.route("/std-comments").get(getComment);
lectureRouter.route("/reply").post(postReply);
lectureRouter
  .route("/issues")
  .post(imageUploader.single("referenceImage"), postIssue);
lectureRouter.route("/get-issues").get(getIssue);
lectureRouter.route("/reply-issues").post(postIssueReply);
lectureRouter.route("/all-comment").get(getAllComment);
lectureRouter.route("/all-issues").get(getAllIssue);
lectureRouter.route("/progress-state").get(getLectureProgressState);
lectureRouter.route("/purchase-lecture-info").get(getPurchaseLectureInfo);
export default lectureRouter;
