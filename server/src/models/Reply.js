import mongoose from "mongoose";

// MongoDB 시간 설정
const date = new Date();
date.setHours(date.getHours() + 9);

const replySchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  ownerProfileUrl: { type: String, default: "" },
  ownerNickname: { type: String, default: "" },
  authorType: { type: String, default: "student" }, // 작성자 타입 student or admin
  content: { type: String },
  createdAt: { type: Date, default: date },
});

const Reply = mongoose.model("Reply", replySchema);

export default Reply;
