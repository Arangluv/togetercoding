import styled from "styled-components";
import LectureHeader from "./LectureHeader";
import VedioPart from "./VedioPart";
import CompleteLecture from "./CompleteLecture";
import LectureNotification from "./LectureNotification";
import TypingType from "./TypingType";
import NotePart from "./NotePart";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { commentState, noteState, panelState } from "../../atom/atoms";
import NoteAndComent from "./NoteAndComent";
import IssuePart from "./IssuePart";
import { useLocation } from "react-router-dom";
import GithubUrlPart from "./GithubUrlPart";
import { useEffect, useRef } from "react";
import IssueWritePart from "./IssueWritePart";

const Wrapper = styled.div`
  width: 75%;
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 10vh;
  position: absolute;
  left: 25%;
  border: 3px solid blue;
`;

export default function LectureScreen() {
  const noteActive = useRecoilValue(noteState);
  const [comment, setComment] = useRecoilState(commentState);
  const setPanel = useSetRecoilState(panelState);
  const lectureId = useLocation().pathname.split("/")[3];
  const location = useLocation();
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    console.log("ref 몇번 시작?");
    console.log(ref.current);
    console.log("location");
    console.log(location);
    if (!location?.state) {
      return;
    }
    // 사용자가 이슈를 눌러서 왔다
    setComment("issue");
    setPanel(location.state._id);
    if (!ref?.current) {
      console.log("ref 동작안함");
      console.log(ref);
      console.log(ref);
    }
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  }, [location, ref]);
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
      {comment === "note" ? <NoteAndComent /> : <IssuePart ref={ref} />}
    </Wrapper>
  );
}
