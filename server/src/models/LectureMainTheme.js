import mongoose from "mongoose";

const lectureMainThemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subLecture: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubLecture" }],
  //   listenLecture: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
});

const LectureMainTheme = mongoose.model(
  "LectureMainTheme",
  lectureMainThemeSchema
);

export default LectureMainTheme;
