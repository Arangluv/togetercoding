import styled from "styled-components";
import { TbMoneybag } from "react-icons/tb";
import { BsGraphUpArrow } from "react-icons/bs";
import { HiOutlineSpeakerphone } from "react-icons/hi";
const Wrapper = styled.div`
  width: 100%;
  /* min-height: 100vh; */
  height: 140vh;
  background-image: linear-gradient(to right, #434343 0%, black 100%);
`;
const Title = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 2vw;
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
  }
`;
const TitleContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 3vw;
`;
const TitleContent = styled.article`
  width: 25%;
  height: 40vh;
  border-radius: 20px;
  padding: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    to top,
    #d5d4d0 0%,
    #d5d4d0 1%,
    #eeeeec 31%,
    #efeeec 75%,
    #e9e9e7 100%
  );
  span {
    display: block;
    color: #fbc531;
    margin-bottom: 0.5vw;
    svg {
      width: 3vw;
      height: 3vw;
    }
    /* width: 100%; */
  }
  h3 {
    font-size: 1.5vw;
    font-weight: 600;
    margin-bottom: 1vw;
    color: #2c3e50;
  }
  p {
    margin-top: 1vw;
    color: #2c3e50;
    font-size: 1.1vw;
    line-height: 1.4;
  }
  span,
  h3 {
    text-align: center;
  }
`;
const IntroductionContainer = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 2vw;
  img {
    position: absolute;
    right: 6vw;
    width: 35vw;
    height: 35vw;
  }
`;
const IntroductionContent = styled.div`
  width: 55%;
  height: 100%;
  padding: 3vw 7vw;
  display: flex;
  flex-direction: column;
  h2 {
    display: flex;
    flex-direction: column;
    margin-bottom: 2vw;
    span {
      margin-bottom: 0.5vw;
      font-weight: 600;
      font-size: 2.5vw;
      background-image: linear-gradient(
        to top,
        #d5d4d0 0%,
        #d5d4d0 1%,
        #eeeeec 31%,
        #efeeec 75%,
        #e9e9e7 100%
      );
      color: transparent;
      -webkit-background-clip: text;
    }
    #accent_span {
      background-image: linear-gradient(-60deg, #ff5858 0%, #f09819 100%);
      color: transparent;
      -webkit-background-clip: text;
    }
  }
`;
const ParagraphContent = styled.p`
  white-space: pre-wrap;
  line-height: 1.5;
  margin-bottom: 1.5vw;
  background-image: linear-gradient(
    to top,
    #d5d4d0 0%,
    #d5d4d0 1%,
    #eeeeec 31%,
    #efeeec 75%,
    #e9e9e7 100%
  );
  color: transparent;
  -webkit-background-clip: text;
  font-size: 1.2vw;
`;
export default function MainSecond() {
  return (
    <Wrapper>
      <Title>
        <h2>이런 것들을 챙길 수도록 꼼꼼히 기획했어요</h2>
        <TitleContentContainer>
          <TitleContent>
            <span>
              <TbMoneybag />
            </span>
            <h3>스스로 수익화 할 수 있는 능력</h3>
            <p>
              수익형 웹사이트 제작을 위한 여러가지 인사이트를 제공해드려요. 또한
              단순 생각에만 머무는 것이 아닌, 실제 서비스 할 수 있도록 동적으로
              사이트맵 생성, 애드센스 및 쿠팡파트너스 배너 달기, 애널리틱스
              붙여보기 등 여러가지 기술을 알려드리고 있습니다 :)
            </p>
          </TitleContent>
          <TitleContent>
            <span>
              <BsGraphUpArrow />
            </span>
            <h3>J커브 실력향상</h3>
            <p>
              메모장, 할일적기, 계산기같은 예제는 만들지 않아요! 실제 바이럴
              마케팅에 적용되는 여러가지 테스트, 퀴즈와 같은 트렌디한 예제들로
              학습해요. 강의 동영상을 보고 무작정 따라치기 급급한 것이 아닌,
              수강생들에게 반드시 혼자서 구현하면 좋을점을 문제로 제시한 후
              솔루션을 제공하여 능동적인 사고가 가능하게 해줍니다
            </p>
          </TitleContent>
          <TitleContent>
            <span>
              <HiOutlineSpeakerphone />
            </span>
            <h3>본인만의 스토리</h3>
            <p>
              프로젝트를 만들면서 수강생들은 백지부터 시작하게 되요. 기획, 개발
              및 구현, 서비스 배포 모든 과정을 진행하면서 본인만의 스토리를
              만들수 있습니다. 왜 이런 서비스를 만들었는지, 광고는 왜 이곳에
              배치하였는지, 서비스 배포 후 어떤일이 있었는지 자신만의 스토리를
              자랑해주세요
            </p>
          </TitleContent>
        </TitleContentContainer>
      </Title>
      <IntroductionContainer>
        <IntroductionContent>
          <h2>
            <span>안녕하세요!</span>
            <span id="accent_span">수익이되는 코딩하자</span>
            <span>같이코딩입니다.</span>
          </h2>
          <ParagraphContent>
            심심한 이론, 뻔한 예제들로 공부하는 것이 아닌 프로젝트의 수익화를
            목적으로 둔 다양한 예제들로 학습하며 프로젝트를 완성하는데까지 큰
            동기부여를 가지고 학습합니다
          </ParagraphContent>
          <ParagraphContent>
            저 역시 백지에 적는 코드가 무서워서 강의 지옥에 빠졌던 적이
            있습니다. 무언가를 시작하고 싶은데 막막하다면 수익화라는 분명한
            목적의식을 가지고 프로젝트를 하나하나 완성해보세요. 끝까지
            달려갔다면 더 이상 백지에 코드를 적는 것이 무섭지 않을 거에요.
          </ParagraphContent>
          <ParagraphContent>
            수익화를 목적에 둔 코딩은 세심합니다. 절대 스스로 절대
            타협하지않아요. 스스로 자신만의 프로젝트를 완성하는데 필요한
            실력까지 덤으로 가져갈 수 있어요
          </ParagraphContent>
        </IntroductionContent>
        <img src={process.env.PUBLIC_URL + "/main_img.png"} alt="" />
      </IntroductionContainer>
    </Wrapper>
  );
}
