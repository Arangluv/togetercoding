import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteMainTheme,
  deleteSubLecture,
  getAllLecture,
  getLectureList,
  getLectureTitle,
  getListenLecture,
  getMainLecture,
  getSubLecture,
  putCompleteLecture,
  postMakeLecture,
  postMakeMainTheme,
  postMakeSubTheme,
  postLectureComment,
  getLectureComment,
  postReply,
  postIssue,
  getIssue,
  postIssueReply,
  getAllIssue,
  getLectureProgress,
  getPurchaseLectureInfo,
} from "../api/lectureApi";
import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";
import {
  getPurchasesHistory,
  getStudenWritetNote,
  getUserIssue,
  postReceiveAgainEmailVerification,
} from "../api/api";
import { UseFormSetValue } from "react-hook-form";
import { getAllComment } from "../api/lectureApi";
import { getPaymentStatus } from "../api/adminApi";

interface LectureItemProps {
  _id: string;
  thumbnail: string;
  name: string;
  subName: string;
  urlName: string;
  description: string;
  lectureTag: string[];
}
interface MakeLectureProps {
  queryClient: QueryClient;
  navigator: NavigateFunction;
}
interface MainLectureProps {
  lecture: [
    {
      _id: string;
      name: string;
      subLecture: [
        {
          _id: string;
          name: string;
          lectureLink: string;
          notice: string;
        }
      ];
    }
  ];
}
interface MainThemeProps {
  queryClient: QueryClient;
  lectureId: string;
}
interface SubThemeProps {
  queryClient: QueryClient;
  lectureId: string;
  subThemeId: string;
}
interface SubLectureProps {
  name: string;
  lectureLink: string;
  githubUrl: string | null;
  notice: string | null;
}
interface ListenLectureIProps {
  studentEmail: string;
}
interface ListenLectureDataProps {
  id: string;
  totalLectureQuantity: number;
  completeLectureQuantity: number;
  urlName: string;
  name: string;
  thumbnail: string;
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
export const useAllLectureQuery = () => {
  const { data: allLecture, isLoading: allLectureIsLoading } = useQuery<
    LectureItemProps[]
  >(["all-lecture"], getAllLecture, {
    staleTime: 1000 * 60 * 5,
    cacheTime: Infinity,
  });
  return { lecture: allLecture, allLectureIsLoading };
};

export const useMakeLectureMutation = ({
  queryClient,
  navigator,
}: MakeLectureProps) => {
  const { mutate: makeLecture, isLoading: makeLectureLoading } = useMutation({
    mutationFn: postMakeLecture,
    onSuccess: () => {
      toast.success("성공!");
      navigator("/admin-panel");
      return queryClient.invalidateQueries(["all-lecture"]);
    },
    onError: () => {
      toast.error("실패");
    },
  });
  return makeLecture;
};

export const useMainLectureQuery = (lectureId: string) => {
  // Lecture별 아이디로 키 관리 해줘야함
  const { data: mainLecture } = useQuery<MainLectureProps>(
    [lectureId],
    () => getMainLecture(lectureId),
    {
      enabled: lectureId === "" ? false : true,
      staleTime: 1000 * 60 * 5,
      cacheTime: Infinity,
    }
  );
  return mainLecture;
};

export const useMainThemeMutation = ({
  queryClient,
  lectureId,
}: MainThemeProps) => {
  const { mutate: mainThemeMutate, isLoading: mainThemeLoading } = useMutation({
    mutationFn: postMakeMainTheme,
    onSuccess: () => {
      toast.success("챕터를 만들었습니다");
      return queryClient.invalidateQueries([lectureId]);
    },
    onError: () => {
      toast.error("챕터를 만드는데 오류가 발생했습니다");
    },
  });
  return { mainThemeMutate, mainThemeLoading };
};

export const useSubThemeMutation = ({
  queryClient,
  lectureId,
  subThemeId,
}: SubThemeProps) => {
  const { mutate: subThemeMutate, isLoading: subThemeIsLoading } = useMutation({
    mutationFn: postMakeSubTheme,
    onSuccess: () => {
      toast.success("성공~");
      queryClient.invalidateQueries([subThemeId]);
      return queryClient.invalidateQueries([lectureId]);
    },
    onError: () => {
      toast.error("살패~");
    },
  });
  return { subThemeMutate, subThemeIsLoading };
};

export const useMainThemeDeleteMutation = ({
  queryClient,
  lectureId,
}: MainThemeProps) => {
  const { mutate: mainThemeDeleteMutate } = useMutation({
    mutationFn: deleteMainTheme,
    onSuccess: () => {
      toast.success("대 주제를 삭제했습니다");
      return queryClient.invalidateQueries([lectureId]);
    },
    onError: () => {
      toast.error("대 주제를 삭제하는데 실패했습니다");
    },
  });
  return mainThemeDeleteMutate;
};

export const useSubLectureQuery = (subLectureId: string) => {
  const { data: subLectures } = useQuery<SubLectureProps>(
    [subLectureId],
    () => getSubLecture(subLectureId),
    {
      enabled: subLectureId === "" ? false : true,
      staleTime: 1000 * 60 * 5,
      cacheTime: Infinity,
    }
  );
  return subLectures;
};

export const useSubLectureRemoveMutation = ({
  queryClient,
  lectureId,
  subThemeId,
}: SubThemeProps) => {
  const { mutate: subLectureRemoveMutate } = useMutation({
    mutationFn: deleteSubLecture,
    onSuccess: () => {
      toast.success("삭제했습니다");
      queryClient.invalidateQueries([subThemeId]);
      return queryClient.invalidateQueries([lectureId]);
    },
    onError: () => {
      toast.error("삭제하는데 문제가 발생했습니다.");
    },
  });
  return subLectureRemoveMutate;
};

export const useListenLectureQuery = ({
  studentEmail,
}: ListenLectureIProps) => {
  const { data: listenLectures } = useQuery<ListenLectureDataProps[]>({
    queryKey: ["listen-lecture", studentEmail],
    queryFn: getListenLecture,
  });
  return listenLectures;
};
interface LectureTitle {
  name: string;
  totalLectureQuantity: number;
  completeLectureQuantity: number;
}
export const useLectureTitleQuery = (urlName: string) => {
  const { data: lectureTitleData, isLoading: lectureTitleDataLoading } =
    useQuery<LectureTitle>(
      ["lecture-title", urlName],
      () => getLectureTitle(urlName),
      {
        enabled: urlName === "" ? false : true,
        staleTime: 1000 * 60 * 5,
        cacheTime: Infinity,
        retry: false,
      }
    );
  return { lectureTitleData, lectureTitleDataLoading };
};

export const useLectureListQuery = (urlName: string) => {
  const { data: lectureListData } = useQuery<MainLectureListProps[]>(
    ["lecture-list", urlName],
    () => getLectureList(urlName),
    {
      enabled: urlName === "" ? false : true,
      staleTime: 1000 * 60 * 5,
      cacheTime: Infinity,
      retry: false,
    }
  );
  return lectureListData;
};

interface CompleteLectureQuery {
  queryClient: QueryClient;
  urlName: string;
}
export const useCompleteLectureMutation = ({
  queryClient,
  urlName,
}: CompleteLectureQuery) => {
  const { mutate: completeLectureMutate, isLoading: completeLectureLoading } =
    useMutation({
      mutationFn: putCompleteLecture,
      onSuccess: () => {
        toast.success("일단 성공~@");
        return queryClient.invalidateQueries(["lecture-title", urlName]);
      },
      onError: () => {
        toast.error("강의 완료에 실패");
      },
    });
  return { completeLectureMutate, completeLectureLoading };
};
interface postCommentProps {
  setValue: UseFormSetValue<DProps>;
  queryClient: QueryClient;
  subLectureId: string;
}
interface DProps {
  content: string;
  extraError?: string;
}
export const usePostCommentMutation = ({
  queryClient,
  setValue,
  subLectureId,
}: postCommentProps) => {
  const { mutate: postCommentMutate } = useMutation({
    mutationFn: postLectureComment,
    onSuccess: () => {
      toast.success("댓글을 등록했습니다");
      setValue("content", "");
      return queryClient.invalidateQueries(["comment", subLectureId]);
    },
    onError: () => {
      toast.error("댓글을 등록하는데 실패했습니다");
    },
  });
  return postCommentMutate;
};

interface GetCommentProps {
  comment: CommentProps[];
}
interface CommentProps {
  content: string;
  createdAt: string;
  owner: string;
  ownerNickname: string;
  ownerProfileUrl: string;
  reply: ReplyProps[];
  subLectureId: string;
  _id: string;
}
interface ReplyProps {
  authorType: "student" | "admin";
  content: string;
  createdAt: string;
  owner: string;
  ownerNickname: string;
  ownerProfileUrl: string;
  _id: string;
}
export const useSubLectureCommentQuery = (lectureId: string) => {
  const { data: lectureCommentData } = useQuery<GetCommentProps>(
    ["comment", lectureId],
    () => getLectureComment(lectureId),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: Infinity,
    }
  );
  return lectureCommentData;
};
interface PostReplyProps {
  setValue: UseFormSetValue<DProps>;
  queryClient: QueryClient;
  subLectureId: string;
}
export const useCommentReplyMutation = ({
  subLectureId,
  setValue,
  queryClient,
}: PostReplyProps) => {
  const { mutate: commentMutate } = useMutation({
    mutationFn: postReply,
    onSuccess: () => {
      toast.success("댓글을 달았습니다");
      setValue("content", "");
      return queryClient.invalidateQueries(["comment", subLectureId]);
    },
    onError: () => {
      toast.error("댓글을 다는데 문제가 발생했습니다");
    },
  });
  return commentMutate;
};
interface IssueDProps {
  title: string;
  content: string;
  referenceImage: FileList;
}
interface IssueMutateProps {
  queryClient: QueryClient;
  subLectureId: string;
  preview: string;
  setIssueContent: React.Dispatch<React.SetStateAction<string>>;
  setValue: UseFormSetValue<IssueDProps>;
  setPreview: React.Dispatch<React.SetStateAction<string>>;
}
export const usePostIssueMuation = ({
  queryClient,
  subLectureId,
  setIssueContent,
  preview,
  setPreview,
  setValue,
}: IssueMutateProps) => {
  const { mutate: postIssueMutate } = useMutation({
    mutationFn: postIssue,
    onSuccess: () => {
      toast.success("이슈를 생성했습니다!");
      setIssueContent("");
      setValue("title", "");
      setPreview("");
      queryClient.invalidateQueries(["issue", subLectureId]);
      return URL.revokeObjectURL(preview);
    },
    onError: () => {
      toast.error("이슈를 생성하는데 실패했습니다");
    },
  });
  return postIssueMutate;
};

interface IssueProps {
  _id: string;
  owner: string;
  ownerProfileUrl: null | string;
  ownerNickname: string;
  title: string;
  subLectureId: string;
  responseState: false;
  content: string;
  referenceImg: string | null;
  createdAt: string;
  issueReply: IssueReplyProps[];
}
interface IssueReplyProps {
  _id: string;
  authorType: string;
  content: string;
  owner: string;
  ownerNickname: string;
  ownerProfileUrl: string | null;
}
export const useGetIssueQuery = (subLectureId: string) => {
  const { data: issueData } = useQuery<IssueProps[]>(
    ["issue", subLectureId],
    () => getIssue(subLectureId),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: Infinity,
    }
  );
  return issueData;
};
interface IssueReplyMutateProps {
  queryClient: QueryClient;
  subLectureId: string;
  setReplyState: React.Dispatch<React.SetStateAction<string | null>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
export const usePostIssueReplyMutation = ({
  queryClient,
  subLectureId,
  setReplyState,
  setValue,
}: IssueReplyMutateProps) => {
  const { mutate: issueReplyMutate } = useMutation({
    mutationFn: postIssueReply,
    onSuccess: () => {
      toast.success("이슈에 댓글을 달았습니다");
      setValue("");
      setReplyState(null);
      return queryClient.invalidateQueries(["issue", subLectureId]);
    },
    onError: () => {
      toast.error("이슈에 댓글을 다는데 문제가 발생했습니다");
    },
  });
  return issueReplyMutate;
};

// DashBoard Part
interface StudentIssueProps {
  _id: string;
  responseState: boolean;
  urlName: string;
  title: string;
}
export const useGetUserIssueQuery = () => {
  const { data: userIssueData } = useQuery<StudentIssueProps[]>(
    ["user-issue"],
    getUserIssue
  );
  return userIssueData;
};
interface StudentNoteProps {
  _id: string;
  content: string;
  ownerNickname: string;
  ownerProfileUrl: string;
  urlName: string; // 강의 direct url
}
export const useGetStudentNoteQuery = () => {
  const { data: studentNoteData } = useQuery<StudentNoteProps[]>(
    ["user-note"],
    getStudenWritetNote
  );
  return studentNoteData;
};

export const useGetAllStudentCommentQuery = (dateQuery: string) => {
  const { data: allStudentCommentData } = useQuery<StudentNoteProps[]>(
    ["admin-student-comment", dateQuery],
    () => getAllComment(dateQuery),
    {
      enabled: dateQuery === "" ? false : true,
      staleTime: 1000 * 60 * 5,
      cacheTime: Infinity,
    }
  );

  return allStudentCommentData;
};
interface AllIssueProps {
  _id: string;
  title: string;
  urlName: string;
  ownerNickname: string;
}
export const useGetAllStudentIssueQuery = (dateQuery: string) => {
  const { data: allIssueData } = useQuery<AllIssueProps[]>(
    ["admin-student-issue", dateQuery],
    () => getAllIssue(dateQuery),
    {
      enabled: dateQuery === "" ? false : true,
      staleTime: 1000 * 60 * 5,
      cacheTime: Infinity,
    }
  );
  return allIssueData;
};

export const useLectureProgressQuery = (lectureName: string) => {
  const { data: progressState } = useQuery(
    ["progressState", lectureName],
    () => getLectureProgress(lectureName),
    {
      enabled: lectureName === "" ? false : true,
      staleTime: 1000 * 60 * 5,
      cacheTime: Infinity,
    }
  );
  return progressState;
};

interface PurchaseInfoProps {
  name: string;
  subName: string;
  lectureThumbnail: string;
  price: string;
}
export const usePurchaseLectureInfoQuery = (
  lectureName: string,
  navigator: NavigateFunction
) => {
  const { data: purchaseLectureInfo, isError } = useQuery<PurchaseInfoProps>(
    ["purchaseInfo", lectureName],
    () => getPurchaseLectureInfo(lectureName, navigator),
    {
      enabled: lectureName === "" ? false : true,
      staleTime: 1000 * 60 * 5,
      cacheTime: Infinity,
    }
  );
  console.log("hook에서 isError");
  console.log(isError);
  return { purchaseLectureInfo, isError };
};

interface ReceiveAgainEmailVerificationProps {
  email: string;
  setLoginOk: React.Dispatch<React.SetStateAction<boolean>>;
}
export const useReceiveAgainEmailVerificationMutate = ({
  email,
  setLoginOk,
}: ReceiveAgainEmailVerificationProps) => {
  const { mutate: receiveAgainMutate } = useMutation({
    mutationFn: () => postReceiveAgainEmailVerification(email),
    onSuccess: () => {
      setLoginOk(true);
    },
    onError: () => {
      toast.error("인증링크를 보내는데 문제가 발생했습니다");
    },
  });
  return receiveAgainMutate;
};
interface PurchaseHistoryProps {
  paymentAt: string;
  receiptUrl: string;
  amount: number;
  method: string;
  lectureName: string;
}
export const usePurchasesHistoryQuery = () => {
  const { data: purchaseData } = useQuery<PurchaseHistoryProps[]>(
    ["purchasesHistory"],
    () => getPurchasesHistory(),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: Infinity,
    }
  );
  return purchaseData;
};

interface PaymentStatusProps {
  _id: string;
  amount: number;
  lectureName: string;
  method: string;
  paymentAt: string;
  receiptUrl: string;
  buyer: {
    email: string;
    name: string;
  };
}
export const useStudentPaymentStatusQuery = () => {
  const { data: payementStatusData } = useQuery<PaymentStatusProps[]>(
    ["admin", "payment-status"],
    getPaymentStatus,
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: Infinity,
    }
  );
  return payementStatusData;
};
