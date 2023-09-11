import mongoose from "mongoose";

const subLectureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lectureLink: { type: String, required: true },
  studentNote: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  notice: { type: String, default: null },
  isTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  githubUrl: { type: String, default: null },
  issue: [{ type: mongoose.Schema.Types.ObjectId, ref: "Issue" }],
  //   listenLecture: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
});

const SubLecture = mongoose.model("SubLecture", subLectureSchema);

export default SubLecture;
