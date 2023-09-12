import styled from "styled-components";
import { PiWarningCircle } from "react-icons/pi";
const Wrapper = styled.div`
  width: 100%;
  height: 6vw;
  margin-bottom: 1.5vw;
  border-radius: 10px;
  background-color: rgba(99, 110, 114, 0.5);
  padding: 0.5vw 2vw;
  display: flex;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    filter: brightness(1.1);
  }
`;
const IssueContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
`;
const IssueTitle = styled.div`
  width: 90%;
  padding: 1vw 0;
  display: flex;
  align-items: center;
  /* display: flex; */
  span {
    display: flex;
    align-items: center;
    color: #ecf0f1;
    font-size: 1.2vw;
    line-height: 1.6;
    width: 90%;
  }
  svg {
    margin-right: 1vw;
    color: ${(props) => props.theme.successColor};
    width: 1.5vw;
    height: 1.5vw;
  }
`;
const IssueState = styled.div`
  width: 10%;
  height: 100%;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PendingSpan = styled.span`
  font-weight: 600;
  color: #ffae45;
`;
const CompleteSpan = styled.span`
  color: #03b954;
  font-weight: 600;
`;
export default function IssueNote() {
  return (
    <Wrapper>
      <IssueContent>
        <IssueTitle>
          <PiWarningCircle />
          <span>
            왜 이건 이렇게 되고 저건 저렇게 될까요 ?? 정말로 너무 궁금해요 왜
            이건 이렇게 되고 저건 저렇게 될까요 ?? 정말로 너무 궁금해요
          </span>
        </IssueTitle>
        <IssueState>
          <PendingSpan>대기중</PendingSpan>
          {/* <CompleteSpan>답변완료</CompleteSpan> */}
        </IssueState>
      </IssueContent>
    </Wrapper>
  );
}
