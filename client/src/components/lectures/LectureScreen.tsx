import styled from "styled-components";
import LectureHeader from "./LectureHeader";
import VedioPart from "./VedioPart";
import CompleteLecture from "./CompleteLecture";
import LectureNotification from "./LectureNotification";
import TypingType from "./TypingType";
import NotePart from "./NotePart";
import { useRecoilValue } from "recoil";
import { commentState, noteState } from "../../atom/atoms";
import NoteAndComent from "./NoteAndComent";
import IssuePart from "./IssuePart";
import { useLocation } from "react-router-dom";
import GithubUrlPart from "./GithubUrlPart";
import { useEffect } from "react";
import IssueWritePart from "./IssueWritePart";

const Wrapper = styled.div`
  width: 75%;
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 10vh;
  position: absolute;
  left: 25%;
`;

export default function LectureScreen() {
  const noteActive = useRecoilValue(noteState);
  const comment = useRecoilValue(commentState);
  const lectureId = useLocation().pathname.split("/")[3];

  useEffect(() => {
    window.scrollTo(0, 0);
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
