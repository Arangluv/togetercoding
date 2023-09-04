import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  min-height: 50vh;
  height: auto;
  margin-top: 10vw;
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
const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 2vw;
`;
const Content = styled.div`
  width: 30%;
  height: 40vh;
  border-radius: 20px;
  background-color: #2f3542;
  display: flex;
  flex-direction: column;
  position: relative;
  img {
    position: absolute;
    width: 150px;
    height: 150px;
    top: 2vw;
    left: 50%;
    transform: translateX(-50%);
  }
`;
const ContentDescription = styled.div`
  height: 15vh;
  width: 100%;
  position: absolute;
  bottom: 0;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  p {
    width: 100%;
    height: 100%;
    padding: 1vw;
    color: ${(props) => props.theme.textColor};
    white-space: pre-wrap;
    text-align: center;
    line-height: 1.5;
    font-weight: 600;
  }
`;
export default function CommonOverview() {
  return (
    <Wrapper>
      <Title>
        <h2>실력과 수익화능력까지 둘다 잡으세요!</h2>
        <small>같이코딩은 왜 수익화를 강조할까요?</small>
      </Title>
      <ContentContainer>
        <Content>
          <img src="https://nomadcoders.co/freeCourse01.svg" alt="" />
          <ContentDescription>
            <p>{`우리는 그동안
딱딱한 이론과 문법 중심의
한국식 코딩을 배워왔어요.`}</p>
          </ContentDescription>
        </Content>
        <Content>
          <img src="https://nomadcoders.co/freeCourse01.svg" alt="" />
          <ContentDescription>
            <p>{`우리는 그동안
딱딱한 이론과 문법 중심의
한국식 코딩을 배워왔어요.`}</p>
          </ContentDescription>
        </Content>
        <Content>
          <img src="https://nomadcoders.co/freeCourse01.svg" alt="" />
          <ContentDescription>
            <p>{`우리는 그동안
딱딱한 이론과 문법 중심의
한국식 코딩을 배워왔어요.`}</p>
          </ContentDescription>
        </Content>
      </ContentContainer>
    </Wrapper>
  );
}
