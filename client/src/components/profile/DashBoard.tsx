import { useState } from "react";
import styled from "styled-components";
import ListenedLecture from "../dashborad/ListenedLecture";
import IssueNote from "../dashborad/IssueNote";
import StudyNote from "../dashborad/StudyNote";
import {
  useGetStudentNoteQuery,
  useGetUserIssueQuery,
  useListenLectureQuery,
} from "../../hooks/lecture";
import { useRecoilValue } from "recoil";
import { studentLoginState } from "../../atom/atoms";
import WriteNote from "../dashborad/WriteNote";

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
  position: relative;
  min-height: 50vh;
`;
const DashBoardIssueBox = styled.article`
  width: 100%;
  margin-top: 1vw;
  display: flex;
  flex-direction: column;
  padding: 0 5vw;
  position: relative;
  min-height: 50vh;
`;
const EmptyNotice = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  color: ${(props) => props.theme.textColor};
  transform: translate(-50%, -50%);
  font-size: 1.3vw;
  opacity: 0.8;
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
  const studentIssueData = useGetUserIssueQuery();
  const studentNoteData = useGetStudentNoteQuery();
  console.log("listenLectures");
  console.log(listenLectures);
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
          {listenLectures?.length ? (
            listenLectures?.map((lecture) => {
              return (
                <ListenedLecture
                  key={lecture.id}
                  totalLectureQuantity={lecture.totalLectureQuantity} //현재 강의의 수
                  urlName={lecture.urlName}
                  name={lecture.name}
                  thumbnail={lecture.thumbnail}
                />
              );
            })
          ) : (
            <EmptyNotice>시청중인 강의가 없습니다</EmptyNotice>
          )}
        </DashBoardLectureBox>
      ) : null}
      {currentState === "issue" ? (
        <DashBoardIssueBox>
          {studentIssueData?.length ? (
            studentIssueData.map((issue) => {
              return (
                <IssueNote
                  key={issue._id}
                  responseState={issue.responseState}
                  title={issue.title}
                  urlName={issue.urlName}
                  _id={issue._id}
                />
              );
            })
          ) : (
            <EmptyNotice>작성한 이슈가 없습니다</EmptyNotice>
          )}
        </DashBoardIssueBox>
      ) : null}
      {currentState === "note" ? (
        <DashBoardIssueBox>
          {studentNoteData?.length ? (
            studentNoteData.map((note) => {
              return (
                <WriteNote
                  key={note._id}
                  ownerNickname={note.ownerNickname}
                  ownerProfileUrl={note.ownerProfileUrl}
                  content={note.content}
                  urlName={note.urlName}
                />
              );
            })
          ) : (
            <EmptyNotice>작성한 노트가 없습니다</EmptyNotice>
          )}
        </DashBoardIssueBox>
      ) : null}
    </Wrapper>
  );
}
