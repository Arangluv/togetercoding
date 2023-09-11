import styled from "styled-components";
import { PiWarningCircle } from "react-icons/pi";
const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    width: 90%;
    svg {
      width: 1.5vw;
      height: 1.5vw;
      margin-right: 0.5vw;
      color: #99cd33;
    }
    span {
      display: block;
      width: 100%;
      color: ${(props) => props.theme.textColor};
    }
  }
  #pendding {
    color: #ffcc00;
  }
  #complete {
    color: ${(props) => props.theme.successColor};
  }
`;
interface IProps {
  title: string;
  responseState: boolean;
}
export default function IssueTitle({ title, responseState }: IProps) {
  return (
    <Wrapper>
      <div>
        <PiWarningCircle />
        <span>{title}</span>
      </div>
      {responseState ? (
        <span id="complete">답변 완료</span>
      ) : (
        <span id="pendding">대기중</span>
      )}
    </Wrapper>
  );
}
