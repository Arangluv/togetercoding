import styled from "styled-components";
import { AiOutlineCheckCircle } from "react-icons/ai";
const Wrapper = styled.div`
  width: 100%;
  min-height: 20vh;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 6vw;
`;
const Title = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
const RecomandContainer = styled.div`
  width: 100%;
  min-height: 20vh;
  height: auto;
  display: flex;
  justify-content: space-between;
  margin-top: 2vw;
`;
const StackRecommandBox = styled.div`
  width: 48%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 2vw;
  background-color: #2f3542;
  h3 {
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    width: 100%;
    height: 5vh;
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    font-size: 1.5vw;
    margin-bottom: 1vw;
  }
  div {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    min-height: 15vh;
    height: auto;
    display: flex;
    flex-direction: column;
    span {
      display: flex;
      align-items: center;
      color: #bdc3c7;
      filter: brightness(1.3);
      margin-bottom: 1vw;
      font-size: 1.2vw;
      svg {
        width: 1.5vw;
        height: 1.5vw;
        margin-right: 0.5vw;
      }
    }
  }
`;
const MindRecommandBox = styled(StackRecommandBox)``;
export default function LevelIntroduction() {
  return (
    <Wrapper>
      <Title>
        <h2>이런분들에게 추천해요</h2>
        <small>이런것들이 갖춰져있으면 좋은 시너지로 작용해요</small>
      </Title>
      <RecomandContainer>
        <StackRecommandBox>
          <h3>Stack</h3>
          <div>
            <span>
              <AiOutlineCheckCircle />
              <small>초급 이상의 HTML. CSS 이해도가필요합니다.</small>
            </span>
            <span>
              <AiOutlineCheckCircle />
              <small>초급 이상의 Javascript 이해도가 필요합니다.</small>
            </span>
          </div>
        </StackRecommandBox>
        <MindRecommandBox>
          <h3>Mind</h3>
          <div>
            <span>
              <AiOutlineCheckCircle />
              <small>초급 이상의 HTML. CSS 이해도가필요합니다.</small>
            </span>
            <span>
              <AiOutlineCheckCircle />
              <small>초급 이상의 Javascript 이해도가 필요합니다.</small>
            </span>
            <span>
              <AiOutlineCheckCircle />
              <small>초급 이상의 Javascript 이해도가 필요합니다.</small>
            </span>
            <span>
              <AiOutlineCheckCircle />
              <small>초급 이상의 Javascript 이해도가 필요합니다.</small>
            </span>
            <span>
              <AiOutlineCheckCircle />
              <small>초급 이상의 Javascript 이해도가 필요합니다.</small>
            </span>
          </div>
        </MindRecommandBox>
      </RecomandContainer>
    </Wrapper>
  );
}
