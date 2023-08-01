import Lecture from "../models/Lecture";
import LectureMainTheme from "../models/LectureMainTheme";

export const getAllLecture = async (req, res) => {
  try {
    const lecture = await Lecture.find({});
    return res.status(200).json({ lecture });
  } catch (error) {
    return res.status(404).send();
  }
};

export const postMakeLecture = async (req, res) => {
  const { name } = req.body;
  const { location } = req.file;
  try {
    await Lecture.create({
      name,
      thumbnail: location,
    });
    return res.status(200).json({ message: "일단 성공으로 res" });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "강의를 만드는데 문제가 발생했습니다" });
  }
};

export const getMainLecture = async (req, res) => {
  try {
    const { lectureId } = req.query;
    const lecture = await Lecture.findById(lectureId).populate("lecture");
    console.log("lecture");
    console.log(lecture);
    return res.status(200).json({ lecture: lecture.lecture });
  } catch (error) {
    res.status(404).json({ message: "강의를 찾는데 실패했습니다" });
  }
};
export const postMakeMainTheme = async (req, res) => {
  try {
    const { lectureId, lectureName } = req.body;
    const lecture = await Lecture.findById(lectureId);
    const mainLecture = await LectureMainTheme.create({
      name: lectureName,
    });
    lecture.lecture.push(mainLecture._id);
    await lecture.save();
    return res.status(200).json({ message: "챕터를 만들었습니다" });
  } catch (error) {
    return res.status(404).json({ message: "챕터를 만드는데 실패했습니다" });
  }
};
