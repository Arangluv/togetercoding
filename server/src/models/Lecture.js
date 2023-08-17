import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subName: { type: String, required: true },
  urlName: { type: String, required: true },
  description: { type: String, required: true },
  lectureTag: [{ type: String, required: true }],
  thumbnail: { type: String, default: "" },
  lecture: [{ type: mongoose.Schema.Types.ObjectId, ref: "LectureMainTheme" }],
});

const Lecture = mongoose.model("Lecture", lectureSchema);

export default Lecture;
