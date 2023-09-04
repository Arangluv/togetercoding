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
} from "../api/lectureApi";
import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";
import { lecturePayment } from "../api/api";

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
  _id: string;
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

export const useLecturePaymentMutataion = () => {
  const { mutate: lecturePaymentMutate, isLoading: paymentLoading } =
    useMutation({
      mutationFn: lecturePayment,
      onSuccess: () => {
        toast.success("임시적으로 구매 성공!");
      },
      onError: () => {
        toast.error("구매하는데 문제가 발생 ㅠ.ㅠ");
      },
    });
  return { lecturePaymentMutate, paymentLoading };
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
