import styled from "styled-components";
import { BsGraphUpArrow } from "react-icons/bs";
const Wrapper = styled.div`
  width: 100%;
  min-height: 20vh;
  height: auto;
  margin-top: 4vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4vw;
  h2 {
    font-size: 2vw;
    font-weight: 700;
    background-image: linear-gradient(-60deg, #ff5858 0%, #f09819 100%);
    color: transparent;
    -webkit-background-clip: text;
  }
  small {
    font-size: 1.3vw;
    margin-top: 0.5vw;
    font-weight: 600;
    color: #bdc3c7;
    filter: brightness(1.1);
  }
`;
const WillTodoContainer = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;
const WillTodoItem = styled.div`
  width: 100%;
  height: 50vh;
  border-radius: 20px;
  background-color: #2d3436;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vw 0;
  position: relative;
  h2 {
    color: #0097e6;
    filter: brightness(1.3);
    font-weight: 700;
    text-decoration: underline;
    font-size: 2.5vw;
    margin-bottom: 0.5vw;
  }
  span {
    white-space: pre-wrap;
    text-align: center;
    color: ${(props) => props.theme.textColor};
    font-size: 1.3vw;
    font-weight: 600;
  }
  small {
    text-align: center;
    font-size: 1.1vw;
    color: ${(props) => props.theme.textColor};
    white-space: pre-wrap;
    margin: 1.5vw 0;
    line-height: 1.6;
  }
  svg {
    position: absolute;
    border-radius: 10px;
    width: 8vw;
    height: 8vw;
    background-color: #0097e6;
    color: ${(props) => props.theme.textColor};
    filter: brightness(1.3);
    padding: 1vw;
    bottom: 2vw;
  }
`;
export default function CourseSummary() {
  return (
    <Wrapper>
      <Title>
        <h2>강의가 끝나고 여러분은 스스로</h2>
        <small>이런것들을 할 수 있게 됩니다</small>
      </Title>
      <WillTodoContainer>
        <WillTodoItem>
          <h2>01</h2>
          <span>{"최소한의 지식과 기초단계 \n 나만의 노하우"}</span>
          <small>
            {
              "대통령·국무총리·국무위원·행정각부의 \n 장·헌법재판소 재판관·법관·중앙선거관리위원회 \n 위원·감사원장·감사위원 "
            }
          </small>
          <BsGraphUpArrow />
        </WillTodoItem>
        <WillTodoItem>
          <h2>01</h2>
          <span>{"최소한의 지식과 기초단계 \n 나만의 노하우"}</span>
          <small>
            {
              "대통령·국무총리·국무위원·행정각부의 \n 장·헌법재판소 재판관·법관·중앙선거관리위원회 \n 위원·감사원장·감사위원 "
            }
          </small>
          <BsGraphUpArrow />
        </WillTodoItem>
        <WillTodoItem>
          <h2>01</h2>
          <span>{"최소한의 지식과 기초단계 \n 나만의 노하우"}</span>
          <small>
            {
              "대통령·국무총리·국무위원·행정각부의 \n 장·헌법재판소 재판관·법관·중앙선거관리위원회 \n 위원·감사원장·감사위원 "
            }
          </small>
          <BsGraphUpArrow />
        </WillTodoItem>
        <WillTodoItem>
          <h2>01</h2>
          <span>{"최소한의 지식과 기초단계 \n 나만의 노하우"}</span>
          <small>
            {
              "대통령·국무총리·국무위원·행정각부의 \n 장·헌법재판소 재판관·법관·중앙선거관리위원회 \n 위원·감사원장·감사위원 "
            }
          </small>
          <BsGraphUpArrow />
        </WillTodoItem>
      </WillTodoContainer>
    </Wrapper>
  );
}
