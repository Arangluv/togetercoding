import { useRecoilState } from "recoil";
import styled from "styled-components";
import { commentState, noteState } from "../../atom/atoms";
import { BsFillPencilFill } from "react-icons/bs";
const Wrapper = styled.div`
  width: 100%;
  height: 10vh;
  padding: 1vw;
  margin-top: 1vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InActiveSpan = styled.span`
  font-size: 1.3vw;
  color: ${(props) => props.theme.textColor};
  margin-right: 0.5vw;
  padding: 0.5vw 2vw;
  border-radius: 20px;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.textColor};
    color: #1e272e;
  }
`;
const ActiveSpan = styled(InActiveSpan)`
  background-color: ${(props) => props.theme.textColor};
  color: #1e272e;
`;
const ActionBox = styled.div``;
const TypingBox = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 1.3vw;
    color: #5cb85b;
    filter: brightness(1.3);
    margin-right: 0.5vw;
    padding: 0.5vw 2vw;
    border-radius: 20px;
    transition: all 0.2s ease-in-out;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
    svg {
      margin-left: 0.5vw;
    }
  }
`;
export default function TypingType() {
  const [comment, setComent] = useRecoilState(commentState);
  const [noteActiveState, setNoteActiveState] = useRecoilState(noteState);
  const handleWriteNoteClick = () => {
    if (noteActiveState === "noteWrite") {
      setNoteActiveState(null);
    }
    if (noteActiveState === "issueWrite") {
      setNoteActiveState("noteWrite");
    }
    if (noteActiveState === null) {
      setNoteActiveState("noteWrite");
    }
  };
  const handleWriteIssueClick = () => {
    if (noteActiveState === "noteWrite") {
      setNoteActiveState("issueWrite");
    }
    if (noteActiveState === "issueWrite") {
      setNoteActiveState(null);
    }
    if (noteActiveState === null) {
      setNoteActiveState("issueWrite");
    }
  };
  return (
    <Wrapper>
      <ActionBox>
        {comment === "note" ? (
          <ActiveSpan onClick={() => setComent("note")}>노트정리</ActiveSpan>
        ) : (
          <InActiveSpan onClick={() => setComent("note")}>
            노트정리
          </InActiveSpan>
        )}
        {comment === "issue" ? (
          <ActiveSpan onClick={() => setComent("issue")}>
            문제가 발생했어요
          </ActiveSpan>
        ) : (
          <InActiveSpan onClick={() => setComent("issue")}>
            문제가 발생했어요
          </InActiveSpan>
        )}
      </ActionBox>
      <TypingBox>
        {comment === "note" ? (
          <span onClick={handleWriteNoteClick}>
            노트작성
            <BsFillPencilFill />
          </span>
        ) : comment === "issue" ? (
          <span onClick={handleWriteIssueClick}>
            이슈작성 <BsFillPencilFill />
          </span>
        ) : null}
      </TypingBox>
    </Wrapper>
  );
}
