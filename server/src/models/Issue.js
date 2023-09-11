import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  ownerProfileUrl: { type: String, default: "" },
  ownerNickname: { type: String, default: "" },
  title: { type: String, required: true },
  subLectureId: { type: mongoose.Schema.Types.ObjectId, ref: "SubLecture" },
  content: { type: String },
  responseState: { type: Boolean, default: false },
  referenceImg: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now() },
  issueReply: [{ type: mongoose.Schema.Types.ObjectId, ref: "IssueReply" }],
});

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
