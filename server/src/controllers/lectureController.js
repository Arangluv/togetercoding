import Lecture from "../models/Lecture";

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
