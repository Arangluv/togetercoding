import axios from "axios";
import { BASE_URL } from "../utill/url";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { uploadProgressState } from "../atom/atoms";
interface MainThemeProps {
  lectureName: string;
  lectureId: string;
}
interface SubThemeProps {
  data: FormData;
  setProgressValue: SetterOrUpdater<number>;
}
interface DeleteMainThemeProps {
  lectureId: string;
  mainLectureId: string;
}
interface DeleteSubLectureProps {
  subLectureId: string;
  mainLectureId: string;
  lectureId: string;
}
export const getAllLecture = async () => {
  return await axios({
    url: `${BASE_URL}/lectures/all-lecture`,
    method: "GET",
    withCredentials: true,
  }).then((result) => result.data.lecture);
};

export const postMakeLecture = async (data: FormData) => {
  return await axios({
    url: `${BASE_URL}/lectures/make-lecture`,
    method: "POST",
    params: { directory: "lecture-thumbnail" },
    data,
  });
};

export const getMainLecture = async (lectureId: string) => {
  return await axios({
    url: `${BASE_URL}/lectures/main-lectures`,
    params: { lectureId: lectureId },
    method: "GET",
  }).then((result) => {
    return result.data;
  });
};

export const postMakeMainTheme = async (data: MainThemeProps) => {
  return await axios({
    url: `${BASE_URL}/lectures/main-theme`,
    method: "POST",
    data,
  });
};

export const postMakeSubTheme = async ({
  data,
  setProgressValue,
}: SubThemeProps) => {
  return await axios({
    url: `${BASE_URL}/lectures/sub-theme`,
    method: "POST",
    onUploadProgress: (upLoadEvent) => {
      console.log("upLoadEvent");
      console.log(upLoadEvent);
      const progress = upLoadEvent.progress;
      if (progress) {
        setProgressValue(progress * 100);
      }
    },
    data,
  });
};

export const deleteMainTheme = async (data: DeleteMainThemeProps) => {
  return await axios({
    url: `${BASE_URL}/lectures/delete-maintheme`,
    method: "DELETE",
    data,
  });
};

export const getSubLecture = async (subLectureId: string) => {
  return await axios({
    url: `${BASE_URL}/lectures/sub-lectures`,
    method: "get",
    params: {
      subLectureId,
    },
  }).then((result) => result.data);
};

export const deleteSubLecture = async (data: DeleteSubLectureProps) => {
  return await axios({
    url: `${BASE_URL}/lectures/delete-sub-lecture`,
    method: "DELETE",
    data,
  });
};

export const getListenLecture = async () => {
  return await axios({
    url: `${BASE_URL}/lectures/listen-lectures`,
    method: "GET",
    withCredentials: true,
  }).then((result) => {
    return result.data.listenLectures;
  });
};

export const getLectureTitle = async (urlName: string) => {
  return await axios({
    url: `${BASE_URL}/lectures/lecture-title`,
    method: "GET",
    withCredentials: true,
    params: {
      name: urlName,
    },
  }).then((result) => result.data.lectureTitleInfo);
};

export const getLectureList = async (urlName: string) => {
  return await axios({
    url: `${BASE_URL}/lectures/lecture-list`,
    method: "GET",
    withCredentials: true,
    params: {
      name: urlName,
    },
  }).then((result) => result.data.lectureList);
};
interface CompleteLectureProps {
  lectureId: string;
  urlName: string;
}
export const putCompleteLecture = async (data: CompleteLectureProps) => {
  return await axios({
    url: `${BASE_URL}/lectures/complete-lecture`,
    method: "PUT",
    withCredentials: true,
    data,
  });
};
interface CommentProps {
  subLectureId: string;
  content: string;
  urlName: string;
}
export const postLectureComment = async (data: CommentProps) => {
  return await axios({
    url: `${BASE_URL}/lectures/comments`,
    method: "POST",
    data,
    withCredentials: true,
  });
};

export const getLectureComment = async (subLectureId: string) => {
  return await axios({
    url: `${BASE_URL}/lectures/std-comments`,
    method: "GET",
    params: { subLectureId },
    withCredentials: true,
  }).then((result) => result.data);
};
interface ReplyProps {
  commentId: string;
  content: string;
}
export const postReply = async (data: ReplyProps) => {
  return await axios({
    url: `${BASE_URL}/lectures/reply`,
    method: "POST",
    data,
    withCredentials: true,
  });
};

export const postIssue = async (data: FormData) => {
  return await axios({
    url: `${BASE_URL}/lectures/issues`,
    method: "POST",
    data,
    params: {
      directory: "issues",
    },
    withCredentials: true,
  });
};

export const getIssue = async (subLectureId: string) => {
  return await axios({
    url: `${BASE_URL}/lectures/get-issues`,
    method: "GET",
    params: {
      subLectureId,
    },
    withCredentials: true,
  }).then((result) => result.data.issue);
};
interface IssueReplyProps {
  content: string;
  issueId: string;
}
export const postIssueReply = async (data: IssueReplyProps) => {
  return await axios({
    url: `${BASE_URL}/lectures/reply-issues`,
    method: "POST",
    params: {
      issueId: data.issueId,
    },
    data: {
      content: data.content,
    },
    withCredentials: true,
  });
};
export const getAllComment = async (dataQuery: string) => {
  return axios({
    url: `${BASE_URL}/lectures/all-comment`,
    method: "GET",
    params: { dataQuery },
    withCredentials: true,
  }).then((result) => result.data.comments);
};

export const getAllIssue = async (dateQuery: string) => {
  return axios({
    url: `${BASE_URL}/lectures/all-issues`,
    method: "GET",
    params: { dateQuery },
    withCredentials: true,
  }).then((result) => result.data.issues);
};

export const getLectureProgress = async (lectureName: string) => {
  return axios({
    url: `${BASE_URL}/lectures/progress-state`,
    method: "GET",
    withCredentials: true,
    params: { lectureName },
  }).then((result) => result.data.completeLectureQuantity);
};

export const getPurchaseLectureInfo = async (lectureName: string) => {
  return axios({
    url: `${BASE_URL}/lectures/purchase-lecture-info`,
    method: "GET",
    withCredentials: true,
    params: { lectureName },
  }).then((result) => result.data);
};
