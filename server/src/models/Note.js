import mongoose from "mongoose";

// MongoDB 시간 설정
const date = new Date();
date.setHours(date.getHours() + 9);

const noteSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  ownerProfileUrl: { type: String, default: "" },
  ownerNickname: { type: String, default: "" },
  subLectureId: { type: mongoose.Schema.Types.ObjectId, ref: "SubLecture" },
  content: { type: String },
  createdAt: { type: Date, default: date },
  urlName: { type: String, default: "" },
  reply: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
