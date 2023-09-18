import styled from "styled-components";
import LectureHeader from "./LectureHeader";
import VedioPart from "./VedioPart";
import CompleteLecture from "./CompleteLecture";
import LectureNotification from "./LectureNotification";
import TypingType from "./TypingType";
import NotePart from "./NotePart";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  commentState,
  componentDidMountState,
  noteState,
  panelState,
} from "../../atom/atoms";
import NoteAndComent from "./NoteAndComent";
import IssuePart from "./IssuePart";
import { useLocation } from "react-router-dom";
import GithubUrlPart from "./GithubUrlPart";
import { useEffect, useRef } from "react";
import IssueWritePart from "./IssueWritePart";

const Wrapper = styled.div`
  width: 75%;
  height: 100vh;
  overflow: scroll;
  padding-bottom: 10vh;
  position: absolute;
  left: 25%;
`;

export default function LectureScreen() {
  const noteActive = useRecoilValue(noteState);
  const [comment, setComment] = useRecoilState(commentState);
  const setPanel = useSetRecoilState(panelState);
  const lectureId = useLocation().pathname.split("/")[3];
  const location = useLocation();
  const ref = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const componentDidMount = useRecoilValue(componentDidMountState);
  useEffect(() => {
    console.log("ref?.current");
    console.log(ref?.current);
    if (!location?.state) {
      containerRef?.current?.scrollTo(0, 0);
      return;
    }
    // 사용자가 이슈를 눌러서 왔다
    setComment("issue");
    setPanel(location.state._id);
    // ref?.current?.scrollIntoView({ behavior: "smooth" });
    // 완전히 렌더링 되기전에 호출되는 것을 막기위해
    const timer = setTimeout(() => {
      console.log("타이머가 실행되나?");
      ref?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timer);
  }, [location, componentDidMount]);
  return (
    <Wrapper ref={containerRef}>
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
