import styled from "styled-components";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { useState } from "react";
import Course from "../components/all-course/Course";
import { useAllLectureQuery } from "../hooks/lecture";
const Wrapper = styled.div`
  width: 100%;
  min-height: 126vh;
  padding-top: 6vw;
  padding-bottom: 26vh;
  background: ${(props) => props.theme.bgImage};
  padding-left: 4vw;
  padding-right: 4vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div`
  width: 100%;
  height: 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2vw;
  h2 {
    font-size: 2vw;
    font-weight: 700;
    color: ${(props) => props.theme.textColor};
    margin-bottom: 0.5vw;
  }
  h3 {
    font-size: 1.7vw;
    font-weight: 600;
    color: #7f8c8d;
    margin-bottom: 0.5vw;
  }
`;
const ToggleBtnBox = styled.div`
  width: 100%;
  height: 5vw;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1vw;
`;
const ToggleBtnSubBox = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
`;
const ToggleBtnLeftBox = styled.div<ToggleState>`
  width: 50%;
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.toggleState === "list" ? "rgba(236, 240, 241,0.2)" : "transparent"};
  svg {
    color: white;
    width: 2vw;
    height: 2vw;
  }
`;
const ToggleBtnRightBox = styled.div<ToggleState>`
  width: 50%;
  height: 100%;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.toggleState === "module" ? "rgba(236, 240, 241,0.2)" : "transparent"};
  svg {
    color: white;
    width: 2vw;
    height: 2vw;
  }
`;
const CourseList = styled.div<ToggleState>`
  width: 100%;
  height: auto;
  margin-top: 1vw;
  display: ${(props) => (props.toggleState === "list" ? "block" : "grid")};
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`;

interface ToggleState {
  toggleState: "list" | "module";
}
export default function AllCourses() {
  const [toggleState, setToggleState] = useState<"list" | "module">("list");
  const { lecture, allLectureIsLoading } = useAllLectureQuery();
  console.log("lecture");
  console.log(lecture);
  return (
    <Wrapper>
      <Title>
        <h2>같이코딩 모든코스</h2>
        <h3>웹개발 풀스택과 수익화 능력까지 같이코딩에서</h3>
      </Title>
      <ToggleBtnBox>
        <ToggleBtnSubBox>
          <ToggleBtnLeftBox
            onClick={() => setToggleState("list")}
            toggleState={toggleState}
          >
            <ViewListIcon />
          </ToggleBtnLeftBox>
          <ToggleBtnRightBox
            onClick={() => setToggleState("module")}
            toggleState={toggleState}
          >
            <ViewModuleIcon />
          </ToggleBtnRightBox>
        </ToggleBtnSubBox>
      </ToggleBtnBox>
      <CourseList toggleState={toggleState}>
        {lecture
          ? lecture.map((item) => {
              return (
                <Course
                  key={item._id}
                  toggleState={toggleState}
                  name={item.name}
                  subName={item.subName}
                  urlName={item.urlName}
                  lectureTag={item.lectureTag}
                  _id={item._id}
                  description={item.description}
                  thumbnail={item.thumbnail}
                />
              );
            })
          : null}
      </CourseList>
    </Wrapper>
  );
}
