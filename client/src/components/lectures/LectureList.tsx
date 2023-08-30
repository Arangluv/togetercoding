import styled from "styled-components";
import AccordionLecture from "./AccordionLecture";

const Wrapper = styled.div`
  width: 100%;
  height: 85vh;
  overflow-y: scroll;
  padding: 1vw;
`;

export default function LectureList() {
  return (
    <Wrapper>
      <AccordionLecture />
    </Wrapper>
  );
}
