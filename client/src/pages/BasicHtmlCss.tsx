import styled from "styled-components";
import Title from "../components/course/Title";
import StackInfo from "../components/course/StackInfo";
import CommonOverview from "../components/course/CommonOverview";
import LearingContent from "../components/course/LearningContent";
import LevelIntroduction from "../components/course/LevelIntroduction";
import Curriculum from "../components/course/Curriculum";
import CourseReview from "../components/course/CourseReview";
import CourseSummary from "../components/course/CourseSummary";
import CoursePayment from "../components/course/CoursePayment";
import { HTML_CSS_BASIC_ID } from "../utill/lectureId";

const Wrapper = styled.div`
  width: 100%;
  min-height: 126vh;
  height: auto;
  background: ${(props) => props.theme.bgImage};
  padding-top: 12vw;
  display: flex;
  flex-direction: column;
  padding-left: 10vw;
  padding-right: 10vw;
`;

export default function BasicHtmlCss() {
  return (
    <Wrapper>
      <Title />
      <StackInfo />
      <CommonOverview />
      <LearingContent />
      <LevelIntroduction />
      <CourseSummary />
      <CourseReview />
      <Curriculum />
      <CoursePayment />
    </Wrapper>
  );
}
