import styled from "styled-components";
import { PiWarningCircle } from "react-icons/pi";
const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    svg {
      width: 1.5vw;
      height: 1.5vw;
      margin-right: 0.5vw;
      color: #99cd33;
    }
    span {
      color: ${(props) => props.theme.textColor};
    }
  }
  #is_complete {
    color: #ffcc00;
  }
`;

export default function IssueTitle() {
  return (
    <Wrapper>
      <div>
        <PiWarningCircle />
        <span>하이 헬로우?</span>
      </div>
      <span id="is_complete">대기중</span>
    </Wrapper>
  );
}
