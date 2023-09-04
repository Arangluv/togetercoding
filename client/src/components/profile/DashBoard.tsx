import { useState } from "react";
import styled from "styled-components";
import ListenedLecture from "../dashborad/ListenedLecture";
import IssueNote from "../dashborad/IssueNote";
import StudyNote from "../dashborad/StudyNote";
import { useListenLectureQuery } from "../../hooks/lecture";
import { useRecoilValue } from "recoil";
import { studentLoginState } from "../../atom/atoms";

const Wrapper = styled.div`
  width: 80%;
  padding-right: 5vw;
  min-height: 82vh;
  height: auto;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  padding-left: 2vw;
  padding-bottom: 3vw;
`;
const Title = styled.div`
  height: 5vh;
  width: 100%;
  border-bottom: 2px solid #ecf0f1;
  display: flex;
  align-items: center;
  padding-bottom: 1vw;
  h2 {
    font-size: 1.3vw;
    font-weight: 600;
    color: #ecf0f1;
  }
`;
const NavigationContainer = styled.div`
  width: 100%;
  height: 5vw;
  margin-top: 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NavigationSpan = styled.span<StateProps>`
  &:hover {
    cursor: pointer;
    color: ${(props) => (props.currentState ? "black" : props.theme.textColor)};
  }
  /* border: ${(props) =>
    props.currentState ? "none" : "1px solid #f5f6fa"}; */
  color: ${(props) => (props.currentState ? props.theme.bgColor : "#dfe4ea")};
  background-color: ${(props) => (props.currentState ? "#dfe4ea" : "none")};
  padding: 1vw 2vw;
  margin: 0 1vw;
  border-radius: 10px;
`;
const DashBoardLectureBox = styled.article`
  width: 100%;
  margin-top: 1vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;
const DashBoardIssueBox = styled.article`
  width: 100%;
  margin-top: 1vw;
  display: flex;
  flex-direction: column;
  padding: 0 5vw;
`;
interface StateProps {
  currentState: boolean;
}
export default function DashBoard() {
  const [currentState, setCurrentState] = useState<
    "lecture" | "issue" | "note"
  >("lecture");
  const { email } = useRecoilValue(studentLoginState);
  const listenLectures = useListenLectureQuery({ studentEmail: email });
  console.log("listenLectures");
  console.log(listenLectures);
  //totalLectureQuantity: 1, completeLectureQuantity: 0}
  return (
    <Wrapper>
      <Title>
        <h2>대쉬보드</h2>
      </Title>
      <NavigationContainer>
        <NavigationSpan
          onClick={() => setCurrentState("lecture")}
          currentState={currentState === "lecture"}
        >
          듣고있는 강의
        </NavigationSpan>
        <NavigationSpan
          onClick={() => setCurrentState("issue")}
          currentState={currentState === "issue"}
        >
          내 이슈
        </NavigationSpan>
        <NavigationSpan
          onClick={() => setCurrentState("note")}
          currentState={currentState === "note"}
        >
          필기노트
        </NavigationSpan>
      </NavigationContainer>
      {currentState === "lecture" ? (
        <DashBoardLectureBox>
          {listenLectures?.map((lecture) => {
            return (
              <ListenedLecture
                key={lecture._id}
                progressState={
                  lecture.completeLectureQuantity / lecture.totalLectureQuantity
                } //현재 강의 진행률
                urlName={lecture.urlName}
                name={lecture.name}
                thumbnail={lecture.thumbnail}
              />
            );
          })}
        </DashBoardLectureBox>
      ) : null}
      {currentState === "issue" ? (
        <DashBoardIssueBox>
          <IssueNote />
          <IssueNote />
          <IssueNote />
          <IssueNote />
          <IssueNote />
          <IssueNote />
          <IssueNote />
          <IssueNote />
          <IssueNote />
          <IssueNote />
          <IssueNote />
          <IssueNote />
          <IssueNote />
        </DashBoardIssueBox>
      ) : null}
      {currentState === "note" ? (
        <DashBoardIssueBox>
          <StudyNote />
          <StudyNote />
          <StudyNote />
          <StudyNote />
          <StudyNote />
        </DashBoardIssueBox>
      ) : null}
    </Wrapper>
  );
}
