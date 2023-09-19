import styled from "styled-components";
import FaqList from "./FaqList";

const FaqContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 30vh;
  margin-bottom: 10vw;
  h3 {
    font-size: 1.5vw;
    font-weight: 600;
    margin-bottom: 0.5vw;
    color: ${(props) => props.theme.textColor};
  }
  small {
    font-size: 1.3vw;
    color: ${(props) => props.theme.textColor};
    opacity: 0.8;
  }
`;
export default function FaqContent() {
  return (
    <FaqContentBox>
      <h3>자주 묻는 질문</h3>
      <small>수강생들이 자주 묻는 질문을 모아보았어요</small>
      <FaqList />
    </FaqContentBox>
  );
}
