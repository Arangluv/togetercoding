import Lecture from "../models/Lecture";
import LectureMainTheme from "../models/LectureMainTheme";
import SubLecture from "../models/SubLecture";
import AWS from "aws-sdk";
import fs from "fs";
import path from "path";
AWS.config.update({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
});
const s3 = new AWS.S3();

const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
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
    const lecture = await Lecture.findById(lectureId).populate({
      path: "lecture",
      populate: {
        path: "subLecture",
      },
    });
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

export const postMakeSubTheme = async (req, res) => {
  // console.log("req.body");
  // console.log(req.body);
  // console.log("req.file");
  // console.log(req.file);
  // console.log("req.files");
  // console.log(req.files);
  try {
    const filePath = req.file.path;
    const fileName = req.file.filename;
    const { subLectureName, subLectureId, githubUrl, notice, mainLectureId } =
      req.body;
    console.log("subLectureId");
    console.log(subLectureId === "" ? "비었음" : subLectureId);
    console.log("mainLectureId");
    console.log(mainLectureId === "" ? "비었음" : mainLectureId);
    console.log("subLectureName");
    console.log(subLectureName);
    console.log("githubUrl");
    console.log(githubUrl); // 없으면 undefinesd
    console.log("notice");
    console.log(notice); // 없으면 undefined

    if (subLectureId) {
      // 이미있는 Lecture를 수정하는 경우
      await editSubTheme();
      return res.status(200).json({ message: "sub lecture를 수정했습니다" });
    }
    await makeNewSubTheme({
      filePath,
      fileName,
      subLectureName,
      githubUrl,
      notice,
      mainLectureId,
    });

    return res
      .status(200)
      .json({ message: "새로운 sub lecture를 만들었습니다" });
  } catch (error) {
    // #4
    console.log("post 오류?");
    console.log(error);
    return res
      .status(404)
      .json({ message: "서브 강의를 만드는 도중 오류가 발생했습니다" });
  }
};
// 새로운 subTheme을 만드는 경우
const makeNewSubTheme = async ({
  filePath,
  fileName,
  subLectureName,
  githubUrl,
  notice,
  mainLectureId,
}) => {
  try {
    const location = await videoEncode(filePath, fileName);
    // #2
    console.log("location");
    console.log(location);
    const subLecture = await SubLecture.create({
      name: subLectureName,
      lectureLink: location,
      notice,
      githubUrl: githubUrl,
    });
    await LectureMainTheme.updateOne(
      {
        _id: mainLectureId,
      },
      {
        $push: {
          subLecture: subLecture._id,
        },
      }
    );
    return;
  } catch (error) {
    // #3
    console.log("makeNewSubTheme에서 오류");
    console.log(error);
    throw new Error("새로운 강의를 만드는데 오류가 발생했습니다");
  }
};

// 이미 있는 subTheme을 수정하는 경우
const editSubTheme = async () => {
  return null;
};

const videoEncode = (filePath, fileName) => {
  let location = null;
  return new Promise((resolve, reject) => {
    ffmpeg(filePath)
      .addOption([
        "-profile:v baseline",
        "-level 3.0",
        "-start_number 0",
        "-hls_time 10",
        "-hls_list_size 0",
        "-f hls",
      ])
      .output(`videoEncodeOutput/${fileName}.m3u8`)
      .on("end", () => {
        // 업로드된 ts파일을 s3에 업로드 후
        // encode된 파일을 읽는다 (비동기)
        // 여기서 원본 mp4를 지우고 -> fs.unlink 비동기
        fs.unlink(
          `/Users/hyunsoo/Desktop/my/moneycoding/server/uploads/${fileName}`,
          (err) => {
            if (err) return reject(new Error(err));

            console.log("원본 mp4 파일 삭제");
          }
        );
        location = readFolder();
        // 기존 파일을 삭제햐야함 #5
        console.log("end");
        console.log("내부 location");
        console.log(location);
        return resolve(location);
      })
      .run();
  });

  // #1
};

const readFolder = () => {
  let location = null;
  return new Promise((resolve, reject) => {
    fs.readdir(
      path.join(
        "/Users/hyunsoo/Desktop/my/moneycoding/server/videoEncodeOutput/"
      ),
      "utf8",
      async (err, files) => {
        if (err) {
          reject(new Error(err));
        }
        await Promise.all(
          files.map((filename) => {
            if (filename !== ".DS_Store") {
              const directory = path.join(
                "/Users/hyunsoo/Desktop/my/moneycoding/server/videoEncodeOutput/" +
                  filename
              );
              const file = fs.readFileSync(directory, "utf8");
              // s3에 파일을 업로드 한다
              s3.upload(
                {
                  Bucket: "togethercoding",
                  Key: `lectures/${filename}`, // 저장할 경로
                  Body: file,
                },
                (s3Err, data) => {
                  if (s3Err) {
                    console.error("Error uploading:", s3Err);
                  } else {
                    console.log("File uploaded successfully:");
                    // data.key : test/1690959575920-sample-mp4-file.mp48.ts
                    const deleteEncodeFileName = data.key.split("/")[1];
                    if (data.key.split(".")[2] === "m3u8") {
                      console.log("location을 담았습니다");
                      location = data.Location;
                      console.log("s3 안에서 location ?");
                      console.log(location);
                      resolve(location);
                    }
                    fs.unlink(
                      `/Users/hyunsoo/Desktop/my/moneycoding/server/videoEncodeOutput/${deleteEncodeFileName}`,
                      (err) => {
                        if (err) return reject(new Error(err));

                        console.log("Encode ts, m3u8 파일 삭제");
                      }
                    );
                    // 여기서 encode된 파일을 지운다
                  }
                }
              );
            }
          })
        );
      }
    );
  });
};

export const deleteMainTheme = async (req, res) => {
  const { lectureId, mainLectureId } = req.body;
  try {
    await Lecture.updateOne(
      { _id: lectureId },
      {
        $pull: {
          lecture: mainLectureId,
        },
      }
    );
    await LectureMainTheme.findOneAndRemove({ _id: mainLectureId });
    return res
      .status(200)
      .json({ message: "main theme을 삭제하는데 성공했습니다" });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "main theme을 삭제하는데 실패했습니다" });
  }
};
