import styled from "styled-components";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  subLectureListState,
  subLectureListWithUpdatedIsTaken,
} from "../../atom/atoms";
import { useEffect, useState } from "react";
import { useCompleteLectureMutation } from "../../hooks/lecture";
import { useQueryClient } from "@tanstack/react-query";
const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 1vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CompleteBox = styled.span`
  width: 20%;
  height: 100%;
  border-radius: 30px;
  display: flex;
  padding: 1vw;
  justify-content: space-between;
  background-color: #5cb85b;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    filter: brightness(1.1);
  }
  span {
    color: ${(props) => props.theme.textColor};
    display: flex;
    align-items: center;
  }

  svg {
    background-color: #5cb85b;
    color: ${(props) => props.theme.textColor};
    width: 2vw;
    height: 2vw;
    border-radius: 100%;
  }
`;
const PreviousBox = styled.span<PreviousIndexState>`
  width: 20%;
  height: 100%;
  border-radius: 30px;
  display: flex;
  padding: 1vw;
  justify-content: space-between;
  background-color: #1e272e;
  transition: all 0.2s ease-in-out;
  filter: ${(props) =>
    props.isPrevious ? "brightness(1)" : "brightness(0.6)"};

  &:hover {
    cursor: ${(props) => (props.isPrevious ? "pointer" : "default")};
    filter: ${(props) =>
      props.isPrevious ? "brightness(1.1)" : "brightness(0.6)"};
  }
  span {
    color: ${(props) => props.theme.textColor};
    display: flex;
    align-items: center;
  }

  svg {
    background-color: #1e272e;
    color: ${(props) => props.theme.textColor};
    width: 2vw;
    height: 2vw;
    border-radius: 100%;
  }
`;
interface NextIndexState {
  isNext: boolean;
  isPrevioust: boolean;
}
interface PreviousIndexState {
  isPrevious: boolean;
}
export default function CompleteLecture() {
  const location = useLocation();
  const lectureId = location.pathname.split("/")[3];
  const urlName = location.pathname.split("/")[1];
  const [subLectureList, setSubLectureList] = useRecoilState(
    subLectureListWithUpdatedIsTaken
  );
  const queryClient = useQueryClient();
  const navigator = useNavigate();
  const [currentPageIdx, setCurrentPageIdx] = useState<null | number>(null);
  const { completeLectureMutate, completeLectureLoading } =
    useCompleteLectureMutation({ queryClient, urlName });
  useEffect(() => {
    if (!lectureId || !subLectureList) {
      return;
    }
    const findIdx = subLectureList.findIndex(
      (lecture) => lecture._id === lectureId
    );
    if (findIdx === -1) {
      return;
    }
    setCurrentPageIdx(findIdx);
  }, [lectureId]);
  const handlePreviousClick = () => {
    if (currentPageIdx === 0 || currentPageIdx === null) {
      return;
    }
    // subLectureList[currentPageIdx - 1]._id
    const navigatorPath = location.pathname.split("/");
    // 현재 강의의 url에서 id를 제거한다
    navigatorPath.pop();
    // 이전 강의의 url의 id를 배열에 push
    navigatorPath.push(subLectureList[currentPageIdx - 1]._id);
    // arr를 join한 후 navigate
    navigator(navigatorPath.join("/"));
  };

  const handleNextClick = () => {
    // Expected action
    // step 1. 학생이 강의를 완료했다고 알려줘야한다.
    // step 2. recoil 배열에 있는 isTaken을 false -> true
    // step 3. 다음 강의로 넘어가진다

    // step 1.
    completeLectureMutate({ lectureId, urlName });
    // step 2.
    if (currentPageIdx === null) {
      return;
    }
    const modifiedSubLecture = subLectureList.map((lecture, idx) => {
      if (idx === currentPageIdx) {
        return {
          ...lecture,
          isTaken: true,
        };
      }
      return lecture;
    });
    setSubLectureList([...modifiedSubLecture]);

    // step 3.
    if (currentPageIdx === subLectureList.length - 1) {
      // lecture의 마지막 페이지니 return 해준다.
      return;
    }
    // subLectureList[currentPageIdx - 1]._id
    const navigatorPath = location.pathname.split("/");
    // 현재 강의의 url에서 id를 제거한다
    navigatorPath.pop();
    // 이전 강의의 url의 id를 배열에 push
    navigatorPath.push(subLectureList[currentPageIdx + 1]._id);
    // arr를 join한 후 navigate
    navigator(navigatorPath.join("/"));
  };
  return (
    <Wrapper>
      <PreviousBox
        onClick={handlePreviousClick}
        isPrevious={currentPageIdx !== 0}
      >
        <BsFillArrowLeftCircleFill />
        <span>이전강의보기</span>
      </PreviousBox>
      <CompleteBox onClick={handleNextClick}>
        <BsFillArrowRightCircleFill />
        {currentPageIdx === subLectureList.length - 1 ? (
          <span>강의 완료하기</span>
        ) : (
          <span>완료 후 다음강의보기</span>
        )}
      </CompleteBox>
    </Wrapper>
  );
}
