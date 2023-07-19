import mongoose from "mongoose";
import bcrypt from "bcrypt";

const date = new Date();
date.setHours(date.getHours() + 9);

const studentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
  socialOnly: { type: Boolean, default: false },
  profileImg: { type: String, default: null },
  joinState: {
    approve: { type: Boolean, default: false, required: true },
    token: { type: String, default: null, required: true },
    expires: { type: Date, required: true },
  },
  listenLecture: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
});

studentSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});
const Student = mongoose.model("Student", studentSchema);

export default Student;
