import styled from "styled-components";
import LectureHeader from "./LectureHeader";
import VedioPart from "./VedioPart";
import CompleteLecture from "./CompleteLecture";
import LectureNotification from "./LectureNotification";
import TypingType from "./TypingType";
import NotePart from "./NotePart";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  commentState,
  lectureListState,
  noteState,
  studentMainTheme,
} from "../../atom/atoms";
import NoteAndComent from "./NoteAndComent";
import IssuePart from "./IssuePart";
import { useLocation } from "react-router-dom";
import GithubUrlPart from "./GithubUrlPart";
import { useEffect } from "react";
import IssueWritePart from "./IssueWritePart";

const Wrapper = styled.div`
  width: 75%;
  height: auto;
  overflow-y: scroll;
  background-color: #222f3e;
  padding-bottom: 10vh;
  position: absolute;
  left: 25%;
`;

export default function LectureScreen() {
  const noteActive = useRecoilValue(noteState);
  const comment = useRecoilValue(commentState);
  const lectureData = useRecoilValue(lectureListState);
  const lectureId = useLocation().pathname.split("/")[3];
  const mainTheme = useRecoilValue(studentMainTheme);

  // CASE가 3가지임
  // URL로 direct로 들어온경우 -> mainTheme null 찾기 어려움
  // 클릭해서 넘어간 경우 -> mainTheme존재
  // next or pre 버튼 -> mainTheme 뭔지 모름
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("실행완료");
  }, [lectureId]);
  return (
    <Wrapper>
      <LectureHeader />
      <GithubUrlPart />
      <VedioPart />
      <CompleteLecture />
      <LectureNotification />
      <TypingType />
      {noteActive === "noteWrite" ? (
        <NotePart />
      ) : noteActive === "issueWrite" ? (
        <IssueWritePart />
      ) : null}
      {comment === "note" ? <NoteAndComent /> : <IssuePart />}
    </Wrapper>
  );
}
