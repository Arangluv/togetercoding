import Lecture from "../models/Lecture";
import LectureMainTheme from "../models/LectureMainTheme";
import SubLecture from "../models/SubLecture";
import Purchase from "../models/Purchase";
import Student from "../models/Student";
import AWS from "aws-sdk";
import fs from "fs";
import path from "path";
import Note from "../models/Note";
import Reply from "../models/Reply";
import Issue from "../models/Issue";
import IssueReply from "../models/IssueReply";
AWS.config.update({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
});
const s3 = new AWS.S3();

const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

console.log("ffmpegInstaller.path");
console.log(ffmpegInstaller.path, ffmpegInstaller.version);

export const getAllLecture = async (req, res) => {
  try {
    const lecture = await Lecture.find({});
    return res.status(200).json({ lecture });
  } catch (error) {
    return res.status(404).send();
  }
};

export const postMakeLecture = async (req, res) => {
  console.log(req.body);
  const { name, subName, urlName, description, lectureTag, price } = req.body;
  const { location } = req.file;
  try {
    const tagArr = lectureTag
      .split(",")
      .map((tag) => tag.trim())
      .filter((trimedTag) => trimedTag !== "");

    await Lecture.create({
      name,
      subName,
      urlName,
      description,
      lectureTag: tagArr,
      thumbnail: location,
      price: Number(price),
    });
    return res.status(200).json({ message: "강의를 만들었습니다" });
  } catch (error) {
    console.log(error);
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
  try {
    const file = req?.file;
    const filePath = req.file?.path;
    const fileName = req.file?.filename;
    const {
      subLectureName,
      subLectureId,
      githubUrl,
      notice,
      mainLectureId,
      lectureLink,
      lectureId,
    } = req.body;

    if (subLectureId) {
      // 이미있는 Lecture를 수정하는 경우
      // 파일이 없는 경우 -> req.file === undefined
      await editSubTheme({
        file: req.file,
        subLectureId,
        mainLectureId,
        subLectureName,
        githubUrl,
        notice,
        lectureLink,
      });
      return res.status(200).json({ message: "sub lecture를 수정했습니다" });
    }
    await makeNewSubTheme({
      filePath,
      fileName,
      subLectureName,
      githubUrl,
      notice,
      mainLectureId,
      lectureId,
    });

    return res
      .status(200)
      .json({ message: "새로운 sub lecture를 만들었습니다" });
  } catch (error) {
    // #4
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
  lectureId,
}) => {
  try {
    const location = await videoEncode(filePath, fileName); // return encode video m3u8 location
    // const location = videoEncode(filePath, fileName);
    // #2
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
    const lecture = await Lecture.findById(lectureId);
    lecture.totalLectureQuantity = lecture.totalLectureQuantity + 1;
    await lecture.save();
    // await Lecture.updateOne(
    //   {
    //     _id: lectureId,
    //   },
    //   {
    //     totalLectureQuantity: this.totalLectureQuantity + 1,
    //   }
    // );
    return;
  } catch (error) {
    // #3
    console.log("makeNewSubTheme에서 오류");
    console.log(error);
    throw new Error("새로운 강의를 만드는데 오류가 발생했습니다");
  }
};

// 이미 있는 subTheme을 수정하는 경우
const editSubTheme = async ({
  file,
  subLectureId,
  subLectureName,
  githubUrl,
  notice,
  lectureLink,
}) => {
  // 수정할 파일이 있는 경우
  if (file) {
    try {
      const filePath = file.path;
      const fileName = file.filename;
      const location = await videoEncode(filePath, fileName);
      await SubLecture.findByIdAndUpdate(subLectureId, {
        name: subLectureName,
        githubUrl,
        notice,
        lectureLink: location,
      });
      const bucketName = "togethercoding";
      const folderPrefix = `lectures/${lectureLink.split("/")[4]}/`;
      // List objects within the folder
      s3.listObjects(
        { Bucket: bucketName, Prefix: folderPrefix },
        (err, data) => {
          if (err) {
            console.error("Error listing objects:", err);
            return;
          }

          // Delete each object
          const objectsToDelete = data.Contents.map((obj) => ({
            Key: obj.Key,
          }));
          s3.deleteObjects(
            { Bucket: bucketName, Delete: { Objects: objectsToDelete } },
            (err, data) => {
              if (err) {
                console.error("Error deleting objects:", err);
              } else {
                console.log("Objects deleted:", data.Deleted);
              }
            }
          );
        }
      );
      return;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  await SubLecture.findByIdAndUpdate(subLectureId, {
    name: subLectureName,
    githubUrl,
    notice,
  });
  // 수정할 파일이 없는 경우
  return;
};
const videoEncode = (filePath, fileName) => {
  let location = null;
  return new Promise((resolve, reject) => {
    ffmpeg(filePath)
      .addOption("-profile:v", "baseline")
      .addOption("-strict", "-2")
      .addOption("-level", "3.0")
      .addOption("-start_number", "0")
      .addOption("-hls_time", "10")
      .addOption("-hls_list_size", "0")
      .addOption("-f", "hls")
      .output(`videoEncodeOutput/${fileName.split(".")[0]}.m3u8`)
      .on("end", async () => {
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

        location = await readFolder();
        // 기존 파일을 삭제햐야함 #5
        return resolve(location);
      })
      .run();
  });
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

              // 이게 문제였음 const file = fs.readFileSync(directory, "utf8");
              // s3에 파일을 업로드 한다
              s3.upload(
                {
                  Bucket: "togethercoding",
                  Key: `lectures/${filename.split("-")[0]}/${filename}`, // 저장할 경로
                  Body: fs.createReadStream("videoEncodeOutput/" + filename),
                  ContentType: "multipart/form-data",
                },
                (s3Err, data) => {
                  if (s3Err) {
                    console.error("Error uploading:", s3Err);
                  } else {
                    // data.key : test/1690959575920-sample-mp4-file.mp48.ts
                    const deleteEncodeFileName = data.Key.split("/")[2];

                    if (deleteEncodeFileName.split(".")[1] === "m3u8") {
                      location = data.Location;
                      resolve(location);
                    }

                    fs.unlink(
                      `/Users/hyunsoo/Desktop/my/moneycoding/server/videoEncodeOutput/${deleteEncodeFileName}`,
                      (err) => {
                        if (err) return reject(new Error(err));

                        console.log("Encode ts, m3u8 파일 삭제");
                      }
                    );
                    resolve();
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
// const videoEncode = (filePath, fileName) => {
//   let location = null;
//   return new Promise((resolve, reject) => {
//     ffmpeg(filePath)
//       .addOption("-profile:v", "baseline")
//       .addOption("-strict", "-2")
//       .addOption("-level", "3.0")
//       .addOption("-start_number", "0")
//       .addOption("-hls_time", "10")
//       .addOption("-hls_list_size", "0")
//       .addOption("-f", "hls")
//       .output(`videoEncodeOutput/${fileName.split(".")[0]}.m3u8`)
//       .on("end", () => {
//         // 업로드된 ts파일을 s3에 업로드 후
//         // encode된 파일을 읽는다 (비동기)
//         // 여기서 원본 mp4를 지우고 -> fs.unlink 비동기

//         fs.unlink(
//           `/Users/hyunsoo/Desktop/my/moneycoding/server/uploads/${fileName}`,
//           (err) => {
//             if (err) return reject(new Error(err));

//             console.log("원본 mp4 파일 삭제");
//           }
//         );

//         location = readFolder();
//         // 기존 파일을 삭제햐야함 #5
//         return resolve(location);
//       })
//       .run();
//   });
// };

// const readFolder = () => {
//   let location = null;
//   return new Promise((resolve, reject) => {
//     fs.readdir(
//       path.join(
//         "/Users/hyunsoo/Desktop/my/moneycoding/server/videoEncodeOutput/"
//       ),
//       "utf8",
//       (err, files) => {
//         if (err) {
//           reject(new Error(err));
//         }
//         Promise.all(
//           files.map((filename) => {
//             if (filename !== ".DS_Store") {
//               const directory = path.join(
//                 "/Users/hyunsoo/Desktop/my/moneycoding/server/videoEncodeOutput/" +
//                   filename
//               );
//               const file = fs.readFileSync(directory, "utf8");
//               // s3에 파일을 업로드 한다
//               s3.upload(
//                 {
//                   Bucket: "togethercoding",
//                   Key: `lectures/${filename}`, // 저장할 경로
//                   Body: file,
//                   ContentType: "multipart/form-data",
//                 },
//                 (s3Err, data) => {
//                   if (s3Err) {
//                     console.error("Error uploading:", s3Err);
//                   } else {
//                     console.log("File uploaded successfully:");
//                     console.log("업로드 성공 시 데이터");
//                     console.log(data);
//                     // data.key : test/1690959575920-sample-mp4-file.mp48.ts
//                     const deleteEncodeFileName = data.key.split("/")[1];

//                     if (data.key.split(".")[1] === "m3u8") {
//                       console.log("location을 담았습니다");
//                       location = data.Location;
//                       resolve(location);
//                     }

//                     fs.unlink(
//                       `/Users/hyunsoo/Desktop/my/moneycoding/server/videoEncodeOutput/${deleteEncodeFileName}`,
//                       (err) => {
//                         if (err) return reject(new Error(err));

//                         console.log("Encode ts, m3u8 파일 삭제");
//                       }
//                     );
//                   }
//                 }
//               );
//             }
//           })
//         );
//       }
//     );
//   });
// };

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

export const getSubLecture = async (req, res) => {
  console.log("req.query");
  console.log(req.query);
  const { subLectureId } = req.query;
  try {
    const subLecture = await SubLecture.findById(subLectureId);
    if (!subLecture) {
      throw new Error("Sub Lecture를 불러오는데 오류가 발생했습니다");
    }
    console.log("subLecture");
    console.log(subLecture);
    return res.status(200).json({
      name: subLecture.name,
      githubUrl: subLecture.githubUrl,
      lectureLink: subLecture.lectureLink,
      notice: subLecture.notice,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const deleteSubLecture = async (req, res) => {
  const { subLectureId, mainLectureId, lectureId } = req.body;
  // 비디오 삭제 ->
  // mainTheme 배열에서 제거
  // subLecture 삭제
  try {
    const subLecture = await SubLecture.findById(subLectureId);
    const lectureLinkNumber = subLecture.lectureLink.split("/")[4];
    // 비디오 삭제 Part

    const bucketName = "togethercoding";
    const folderPrefix = `lectures/${lectureLinkNumber}/`;
    // List objects within the folder
    s3.listObjects(
      { Bucket: bucketName, Prefix: folderPrefix },
      (err, data) => {
        if (err) {
          console.error("Error listing objects:", err);
          return;
        }

        // Delete each object
        const objectsToDelete = data.Contents.map((obj) => ({
          Key: obj.Key,
        }));
        s3.deleteObjects(
          { Bucket: bucketName, Delete: { Objects: objectsToDelete } },
          (err, data) => {
            if (err) {
              console.error("Error deleting objects:", err);
            } else {
              console.log("Objects deleted:", data.Deleted);
            }
          }
        );
      }
    );

    await LectureMainTheme.updateOne(
      { _id: mainLectureId },
      {
        $pull: {
          subLecture: subLectureId,
        },
      }
    );
    const lecture = await Lecture.findById(lectureId);
    lecture.totalLectureQuantity = lecture.totalLectureQuantity - 1;
    await lecture.save();

    await SubLecture.deleteOne({ _id: subLectureId });
    return res.status(200).json({ message: "성공적으로 삭제했습니다" });
  } catch (error) {
    return res.status(404).json({ message: "삭제하는데 실패했습니다." });
  }
};

export const getListenLecture = async (req, res) => {
  try {
    if (!req.session) {
      return res.status(404).send();
    }
    const { id } = req.session.user;
    const purchases = await Purchase.find({ buyer: id }).populate("course");
    const listenLectures = purchases.map((item) => {
      return {
        id: item.course._id,
        name: item.course.name,
        thumbnail: item.course.thumbnail,
        urlName: item.course.urlName,
        totalLectureQuantity: item.course.totalLectureQuantity,
        completeLectureQuantity: item.course.completeLectureQuantity,
      };
    });
    return res.status(200).json({ listenLectures });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "수강중인 강의를 불러오는데 오가 발생했습니다." });
  }
};

export const getLectureTitle = async (req, res) => {
  try {
    const { id: studentId } = req.session.user;
    const { name: urlName } = req.query;
    const lecture = await Lecture.findOne({ urlName });
    if (!lecture) {
      return res
        .status(404)
        .json({ message: "강의를 불러오는데 실패했습니다." });
    }
    const student = await Student.findById(studentId);

    // lectureProgres에서 몇번째에 위치하고 있는지 찾는다
    const findIdx = student.lectureProgress.findIndex(
      (progressState) => progressState.lectureName === lecture.name
    );
    const completeLectureQuantity =
      findIdx === -1
        ? 0
        : student.lectureProgress[findIdx].completeLectureQuantity;

    const lectureTitleInfo = {
      name: lecture.name,
      totalLectureQuantity: lecture.totalLectureQuantity,
      completeLectureQuantity,
    };
    return res.status(200).json({ lectureTitleInfo });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "강의를 불러오는데 실패했습니다." });
  }
};

export const getLectureList = async (req, res) => {
  try {
    const { name: urlName } = req.query;
    const { lecture } = await Lecture.findOne({ urlName })
      .populate({
        path: "lecture",
        populate: {
          path: "subLecture",
        },
      })
      .lean();
    if (!req.session) {
      return res
        .status(404)
        .json({ message: "강의 리스트를 불러오는데 실패했습니다" });
    }
    // # CASE1 이렇게 populate된걸 한번에 다 줄지
    // # CASE2 따로 refined 해야하는지 <<
    const refinedLecture = lecture.map((mainLecture) => {
      return {
        ...mainLecture,
        subLecture: mainLecture.subLecture.map((subLecture) => {
          return {
            ...subLecture,
            isTaken: subLecture?.isTaken
              ? subLecture.isTaken.findIndex(
                  (stdId) => stdId.toString() === req.session.user.id
                ) !== -1
              : false,
          };
        }),
      };
    });
    return res.status(200).json({ lectureList: refinedLecture });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "강의 리스트를 불러오는데 실패했습니다" });
  }
};

export const putLectureComplete = async (req, res) => {
  try {
    if (!req.session) {
      throw new Error("올바른 세션이 아닙니다");
    }
    const { lectureId, urlName } = req.body;
    const {
      user: { id: studentId, name },
    } = req.session;
    const subLecture = await SubLecture.findById(lectureId);
    const lecture = await Lecture.findOne({ urlName });
    if (!subLecture || !lecture) {
      throw new Error("강의를 완료하는데 오류가 발생했습니다");
    }
    // 학생이 이미 강의를 수강한 경우
    console.log("studentId");
    console.log(studentId);
    // 6513c5f92fd8fec73d015dcc
    if (
      subLecture.isTaken.findIndex(
        (stdId) => stdId.toString() === studentId
      ) !== -1
    ) {
      return res.status(200).send();
    }
    // 학생이 강의 수강을 아직 안한 경우
    await SubLecture.updateOne(
      { _id: lectureId },
      {
        $push: { isTaken: studentId },
      }
    );
    await Student.updateOne(
      {
        _id: studentId,
        lectureProgress: {
          $elemMatch: {
            lectureName: lecture.name,
          },
        },
      },
      {
        $inc: {
          "lectureProgress.$.completeLectureQuantity": 1,
        },
      }
    );
    await lecture.save();
    return res.status(200).send();
  } catch (error) {
    console.log("에러 발생");
    console.log(error);
    return res.status(404).json({ error });
  }
};

export const postComment = async (req, res) => {
  const { content, subLectureId, urlName } = req.body;
  try {
    if (!req.session) {
      throw new Error("사용자 세션이 없습니다");
    }
    const subLecture = await SubLecture.findById(subLectureId);
    const owner = req.session.user.id;
    if (!subLecture || !owner) {
      return res.status(404).send();
    }
    const commentOwner = await Student.findById(owner);
    if (!commentOwner) {
      throw new Error("코멘트를 저장하는데 문제가 발생했습니다.");
    }
    const comment = await Note.create({
      owner,
      ownerProfileUrl: commentOwner.profileImg,
      ownerNickname: commentOwner.nickname,
      subLectureId,
      content,
      urlName: `${urlName}/lectures/${subLectureId}`,
    });
    await SubLecture.updateOne(
      { _id: subLectureId },
      { $push: { studentNote: comment._id } }
    );
    return res.status(200).json({ message: "코멘트를 추가했습니다" });
  } catch (error) {
    console.log(error);
    return res.status(404).send();
  }
};

export const getComment = async (req, res) => {
  try {
    const { subLectureId } = req.query;
    const subLecture = await SubLecture.findById(subLectureId).populate({
      path: "studentNote",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "reply",
        Model: "Reply",
        options: { sort: { createdAt: 1 } },
      },
    });
    if (!subLecture) {
      throw new Error("코멘트를 찾는데 문제가 발생했습니다");
    }
    const { studentNote } = subLecture;

    return res.status(200).json({ comment: studentNote });
  } catch (error) {
    console.log(error);
    return res.status(404).send();
  }
};

export const postReply = async (req, res) => {
  try {
    const { content, commentId } = req.body;
    const studentId = req.session.user.id;
    // 댓글을 단 사람의 admin check
    let stdType = null;
    const student = await Student.findById(studentId);
    if (
      student.email === "arang@togethercoding.com" &&
      student.nickname === "같이코딩"
    ) {
      stdType = "admin";
    } else {
      stdType = "student";
    }
    const reply = await Reply.create({
      owner: studentId,
      ownerProfileUrl: student.profileImg,
      ownerNickname: student.nickname,
      authorType: stdType, // 작성자 타입 student or admin
      content,
    });
    await Note.updateOne({ _id: commentId }, { $push: { reply: reply._id } });

    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(404).send();
  }
};

export const postIssue = async (req, res) => {
  try {
    const { title, content, subLectureId, urlName } = req.body;
    if (!req.session) {
      throw new Error("이슈를 생성하는데 문제가 발생했습니다");
    }
    const { id } = req.session.user;
    const issuer = await Student.findById(id);
    if (!issuer) {
      throw new Error("이슈를 생성하는데 문제가 발생했습니다");
    }
    const { nickname, profileImg } = issuer;

    const createdIssue = await Issue.create({
      owner: id,
      ownerProfileUrl: profileImg,
      ownerNickname: nickname,
      subLectureId,
      title,
      content,
      urlName: `${urlName}/lectures/${subLectureId}`,
      referenceImg: req.file ? req.file.location : "",
    });

    // 만들어진 issue의 id를 sublecture에 push
    await SubLecture.updateOne(
      { _id: subLectureId },
      { $push: { issue: createdIssue._id } }
    );
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(404).send();
  }
};

export const getIssue = async (req, res) => {
  try {
    const { subLectureId } = req.query;
    const { issue } = await SubLecture.findById(subLectureId)
      .sort({ createdAt: 1 })
      .populate({
        path: "issue",
        populate: {
          path: "issueReply",
          Model: "IssueReply",
        },
      });
    // const { issue } = await SubLecture.findById(subLectureId).populate("issue");
    // console.log(issue);
    return res.status(200).json({ issue });
  } catch (error) {
    console.log(error);
    return res.status(404).send();
  }
};

export const postIssueReply = async (req, res) => {
  try {
    const { content } = req.body;
    const { issueId } = req.query;
    const studentId = req.session.user.id;
    if (!req.session) {
      throw new Error("세션이 만료되었습니다");
    }
    let isAdmin = false;

    const student = await Student.findById(studentId);
    if (!student) {
      throw new Error("올바른 요청이 아닙니다");
    }

    // admin check
    console.log(student);
    console.log(process.env.ADMIN_NAME);
    console.log(process.env.ADMIN_EMAIL);

    if (
      student.name === process.env.ADMIN_NAME &&
      student.email === process.env.ADMIN_EMAIL
    ) {
      isAdmin = true;
    }
    const issueReply = await IssueReply.create({
      owner: student._id,
      ownerProfileUrl: student.profileImg,
      ownerNickname: student.nickname,
      authorType: isAdmin,
      content,
    });
    if (isAdmin) {
      await Issue.updateOne(
        { _id: issueId },
        { $push: { issueReply: issueReply._id }, responseState: true }
      );
    } else {
      await Issue.updateOne(
        { _id: issueId },
        { $push: { issueReply: issueReply._id }, responseState: false }
      );
    }
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(404).send();
  }
};

export const getAllComment = async (req, res) => {
  try {
    console.log(req.query);
    const { dataQuery } = req.query; // all or week or month
    let fromTime = null;
    const toTime = new Date();
    toTime.setHours(toTime.getHours() + 9);
    if (dataQuery === "week") {
      //TODO set from Time
      fromTime = new Date();
      fromTime.setDate(fromTime.getDate() - 7);
    }

    if (dataQuery === "month") {
      // TODO set from, to Time
      fromTime = new Date();
      fromTime.setMonth(fromTime.getMonth() - 1);
    }

    const comments = fromTime
      ? await Note.find({
          createdAt: {
            $gte: fromTime,
            $lte: toTime,
          },
        })
      : await Note.find({});
    return res.status(200).json({ comments });
  } catch (error) {
    console.log(error);
    return res.status(404).send();
  }
};

export const getAllIssue = async (req, res) => {
  const { dateQuery } = req.query;
  console.log(dateQuery);
  let fromTime = null;
  const toTime = new Date();
  toTime.setHours(toTime.getHours() + 9);
  if (dateQuery === "week") {
    //TODO set from Time
    fromTime = new Date();
    fromTime.setDate(fromTime.getDate() - 7);
  }

  if (dateQuery === "month") {
    // TODO set from, to Time
    fromTime = new Date();
    fromTime.setMonth(fromTime.getMonth() - 1);
  }
  const issues = fromTime
    ? await Issue.find({
        responseState: false,
        createdAt: {
          $gte: fromTime,
          $lte: toTime,
        },
      })
    : await Issue.find({ responseState: false });
  try {
    return res.status(200).json({ issues });
  } catch (error) {
    console.log(error);
    return res.status(404).send();
  }
};

export const getLectureProgressState = async (req, res) => {
  try {
    console.log(req.query);
    const { id: studentId } = req.session.user;
    const { lectureName } = req.query;
    if (!studentId) {
      throw new Error("세션이 없습니다");
    }
    const { lectureProgress } = await Student.findById(studentId);
    const progress = lectureProgress.filter(
      (progress) => progress.lectureName === lectureName
    );
    if (progress.length === 0) {
      throw new Error("진행도를 찾는데 문제가 발생했습니다");
    }
    console.log("progress");
    console.log(progress);
    return res
      .status(200)
      .json({ completeLectureQuantity: progress[0].completeLectureQuantity });
  } catch (error) {
    return res.status(404).send();
  }
};

export const getPurchaseLectureInfo = async (req, res) => {
  try {
    const { lectureName } = req.query;
    const { user } = req.session;
    const lecture = await Lecture.findOne({ urlName: lectureName });
    if (!lecture) {
      throw new Error("강의를 불러오는데 실패했습니다");
    }
    if (user) {
      // 유저가 있고, 이미 구매를 했다면 강의 페이지로 이동시킨다
      const { id } = user;
      const purchase = await Purchase.find({ buyer: id }).populate({
        path: "course",
        model: "Lecture",
        match: { name: lecture.name }, // Lecture에서 이름이 일치하는 것만 선택
      });
      if (purchase.length === 0) {
        return res.status(200).json({
          name: lecture.name,
          subName: lecture.subName,
          lectureThumbnail: lecture.thumbnail,
          price: lecture.price,
        });
      }
      return res
        .status(200)
        .json({ message: "이미 구매했습니다", redirectName: lecture.urlName });
    }
    return res.status(200).json({
      name: lecture.name,
      subName: lecture.subName,
      lectureThumbnail: lecture.thumbnail,
      price: lecture.price,
    });
  } catch (error) {
    console.log("구매강의의 정보를 불러오는데 오류가 발생했습니다");
    return res.status(404).send();
  }
};
