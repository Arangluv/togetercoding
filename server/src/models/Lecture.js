import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, default: "" },
  lecture: [{ type: mongoose.Schema.Types.ObjectId, ref: "LectureMainTheme" }],
});

const Lecture = mongoose.model("Lecture", lectureSchema);

export default Lecture;
