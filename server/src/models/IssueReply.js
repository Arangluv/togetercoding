import mongoose from "mongoose";

const issueReplySchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  ownerProfileUrl: { type: String, default: "" },
  ownerNickname: { type: String, default: "" },
  authorType: { type: String, default: "student" },
  content: { type: String },
  createdAt: { type: Date, default: Date.now() },
});

const IssueReply = mongoose.model("IssueReply", issueReplySchema);

export default IssueReply;
