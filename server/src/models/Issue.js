import mongoose from "mongoose";

// MongoDB 시간 설정
const date = new Date();
date.setHours(date.getHours() + 9);

const issueSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  ownerProfileUrl: { type: String, default: "" },
  ownerNickname: { type: String, default: "" },
  title: { type: String, required: true },
  subLectureId: { type: mongoose.Schema.Types.ObjectId, ref: "SubLecture" },
  content: { type: String },
  responseState: { type: Boolean, default: false },
  referenceImg: { type: String, default: "" },
  createdAt: { type: Date, default: date },
  urlName: { type: String, default: "" },
  issueReply: [{ type: mongoose.Schema.Types.ObjectId, ref: "IssueReply" }],
});

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
