import { atom, selector } from "recoil";
interface StudentLoginProps {
  username: string;
  nickname: string;
  email: string;
  profileImg: string;
}

interface MainLectureListProps {
  _id: string;
  name: string;
  subLecture: SubLectureListProps[];
}
interface SubLectureListProps {
  githubUrl: string;
  isTaken: boolean;
  issue: [];
  lectureLink: string;
  name: string;
  notice: string;
  studentNote: [];
  _id: string;
}
export const commentState = atom<"note" | "issue">({
  key: "commentState",
  default: "note",
});
export const noteState = atom<"noteWrite" | "issueWrite" | null>({
  key: "noteState",
  default: null,
});
export const lectureNotification = atom<undefined | string>({
  key: "lectureNotification",
  default: undefined,
});
export const studentLoginState = atom<StudentLoginProps>({
  key: "studentLoginState",
  default: {
    username: "",
    nickname: "",
    email: "",
    profileImg: "",
  },
});

export const isAdmin = atom({
  key: "isAdmin",
  default: false,
});

export const mainTheme = atom<null | string>({
  key: "mainTheme",
  default: null,
});

export const subTheme = atom<null | string>({
  key: "subTheme",
  default: null,
});
export const studentMainTheme = atom<null | string>({
  key: "sutduentMainTheme",
  default: null,
});
export const uploadProgressState = atom({
  key: "uploadProgressState",
  default: 0,
});

export const lectureListState = atom<MainLectureListProps[]>({
  key: "lectureListState",
  default: [],
});

export const subLectureListState = atom<SubLectureListProps[]>({
  key: "subLectureListState",
  default: [],
});

export const subLectureListWithUpdatedIsTaken = selector({
  key: "lectureListWithUpdatedIsTaken",
  get: ({ get }) => {
    return get(subLectureListState);
  },
  set: ({ set, get }, newValue) => {
    set(subLectureListState, newValue);
  },
});

export const panelState = atom<string | boolean>({
  key: "panelState",
  default: "",
});

export const componentDidMountState = atom({
  key: "componentDidMountState",
  default: false,
});

export const footerHeightState = atom<undefined | Number>({
  key: "footerHeightState",
  default: undefined,
});

export const paymentStste = atom<null | "on" | "cancel">({
  key: "paymentState",
  default: null,
});
