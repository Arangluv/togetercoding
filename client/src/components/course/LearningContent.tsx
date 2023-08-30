import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  min-height: 20vh;
  margin-top: 10vw;
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
const LearningContainer = styled.article`
  width: 100%;
  min-height: 20vh;
  height: auto;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 4vw;
`;
const LearningContent = styled.div`
  width: 70%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 2vw 3vw;
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 2vw;
    font-weight: 700;
    margin-bottom: 0.5vw;
    color: #0097e6;
    filter: brightness(1.3);
  }
  span {
    color: #bdc3c7;
    filter: brightness(1.3);
    font-size: 1.2vw;
    font-weight: 600;
    margin-bottom: 1vw;
  }
  p {
    width: 70%;
    font-size: 1.1vw;
    color: ${(props) => props.theme.textColor};
  }
`;
const LearningImage = styled.div`
  width: 400px;
  height: 300px;
  position: relative;
  img {
    position: absolute;
    width: 400px;
    height: 300px;
    top: 0%;
  }
`;
export default function LearingContent() {
  return (
    <Wrapper>
      <Title>
        <h2>강의에서 다루는 것들</h2>
      </Title>
      <LearningContainer>
        <LearningContent>
          <h3>웹개발자 필수 개념들!</h3>
          <span>원리와 원칙 그리고 핵심 포인트 정리!</span>
          <p>
            Django 는 핀터레스트. 인스타그램과 같은 유명한 웹 서비스를
            구현하는데 쓰이는 파이썬 웹 프레임워크 입니다.현 강의에서는 세계적인
            Django 기능 중 하나인 어드민 패널, ORM 및 유저 매니지먼트 기능을
            활용합니다.Django + React 조합은 스타트업 업계에서 인기가 많은 스택
            중 하나이기도 합니다!
          </p>
        </LearningContent>
        <LearningImage>
          <img
            src="https://d2lmphbmp3ptuw.cloudfront.net/assets/7_032d16db51.gif"
            alt=""
          />
        </LearningImage>
      </LearningContainer>
      <LearningContainer>
        <LearningContent>
          <h3>웹개발자 필수 개념들!</h3>
          <span>원리와 원칙 그리고 핵심 포인트 정리!</span>
          <p>
            Django 는 핀터레스트. 인스타그램과 같은 유명한 웹 서비스를
            구현하는데 쓰이는 파이썬 웹 프레임워크 입니다.현 강의에서는 세계적인
            Django 기능 중 하나인 어드민 패널, ORM 및 유저 매니지먼트 기능을
            활용합니다.Django + React 조합은 스타트업 업계에서 인기가 많은 스택
            중 하나이기도 합니다!
          </p>
        </LearningContent>
        <LearningImage>
          <img
            src="https://d2lmphbmp3ptuw.cloudfront.net/assets/7_032d16db51.gif"
            alt=""
          />
        </LearningImage>
      </LearningContainer>
      <LearningContainer>
        <LearningContent>
          <h3>웹개발자 필수 개념들!</h3>
          <span>원리와 원칙 그리고 핵심 포인트 정리!</span>
          <p>
            Django 는 핀터레스트. 인스타그램과 같은 유명한 웹 서비스를
            구현하는데 쓰이는 파이썬 웹 프레임워크 입니다.현 강의에서는 세계적인
            Django 기능 중 하나인 어드민 패널, ORM 및 유저 매니지먼트 기능을
            활용합니다.Django + React 조합은 스타트업 업계에서 인기가 많은 스택
            중 하나이기도 합니다!
          </p>
        </LearningContent>
        <LearningImage>
          <img
            src="https://d2lmphbmp3ptuw.cloudfront.net/assets/7_032d16db51.gif"
            alt=""
          />
        </LearningImage>
      </LearningContainer>
      <LearningContainer>
        <LearningContent>
          <h3>웹개발자 필수 개념들!</h3>
          <span>원리와 원칙 그리고 핵심 포인트 정리!</span>
          <p>
            Django 는 핀터레스트. 인스타그램과 같은 유명한 웹 서비스를
            구현하는데 쓰이는 파이썬 웹 프레임워크 입니다.현 강의에서는 세계적인
            Django 기능 중 하나인 어드민 패널, ORM 및 유저 매니지먼트 기능을
            활용합니다.Django + React 조합은 스타트업 업계에서 인기가 많은 스택
            중 하나이기도 합니다!
          </p>
        </LearningContent>
        <LearningImage>
          <img
            src="https://d2lmphbmp3ptuw.cloudfront.net/assets/7_032d16db51.gif"
            alt=""
          />
        </LearningImage>
      </LearningContainer>
    </Wrapper>
  );
}
