import mongoose from "mongoose";

// MongoDB 시간 설정
const date = new Date();
date.setHours(date.getHours() + 9);
const issueReplySchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  ownerProfileUrl: { type: String, default: "" },
  ownerNickname: { type: String, default: "" },
  authorType: { type: String, default: "student" },
  content: { type: String },
  createdAt: { type: Date, default: date },
});

const IssueReply = mongoose.model("IssueReply", issueReplySchema);

export default IssueReply;
