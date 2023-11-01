import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subName: { type: String, required: true },
  urlName: { type: String, required: true },
  description: { type: String, required: true },
  lectureTag: [{ type: String, required: true }],
  price: { type: Number, required: true, default: 0 },
  thumbnail: { type: String, default: "" },
  totalLectureQuantity: { type: Number, default: 0 },
  lecture: [{ type: mongoose.Schema.Types.ObjectId, ref: "LectureMainTheme" }],
});

const Lecture = mongoose.model("Lecture", lectureSchema);

export default Lecture;
