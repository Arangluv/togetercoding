import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  ownerProfileUrl: { type: String, default: "" },
  ownerNickname: { type: String, default: "" },
  authorType: { type: String, default: "student" }, // 작성자 타입 student or admin
  content: { type: String },
  createdAt: { type: Date, default: Date.now() },
});

const Reply = mongoose.model("Reply", replySchema);

export default Reply;
