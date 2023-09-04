import styled from "styled-components";
import { SiLevelsdotfyi } from "react-icons/si";
import { BiTimeFive } from "react-icons/bi";
import { BsFillCameraVideoFill } from "react-icons/bs";
import AccordionCurriculum from "./AccordionCurriculum";
const Wrapper = styled.div`
  width: 100%;
  min-height: 20vh;
  height: auto;
  margin-top: 8vw;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2vw;
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
const Overview = styled.div`
  width: 100%;
  height: 15vh;
  display: flex;
  justify-content: space-around;
  margin-bottom: 2vw;
`;
const OverviewItem = styled.div`
  width: 25%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;
const OverviewIcon = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 2.5vw;
    height: 2.5vw;
    color: ${(props) => props.theme.textColor};
  }
`;
const OverviewState = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    margin-bottom: 0.5vw;
    color: #2f3640;
    font-weight: 600;
    filter: brightness(0.8);
  }
  small {
    color: ${(props) => props.theme.textColor};
    font-size: 2vw;
    font-weight: 600;
  }
`;
export default function Curriculum() {
  return (
    <Wrapper>
      <Title>
        <h2>강의 커리큘럼</h2>
        <small>실력과 수익화능력까지 가져갈 수 있게 꼼꼼히 구성했어요</small>
      </Title>
      <Overview>
        <OverviewItem>
          <OverviewIcon>
            <SiLevelsdotfyi />
          </OverviewIcon>
          <OverviewState>
            <span>강의레벨</span>
            <small>초중급</small>
          </OverviewState>
        </OverviewItem>
        <OverviewItem>
          <OverviewIcon>
            <BiTimeFive />
          </OverviewIcon>
          <OverviewState>
            <span>강의시간</span>
            <small>190시간+</small>
          </OverviewState>
        </OverviewItem>
        <OverviewItem>
          <OverviewIcon>
            <BsFillCameraVideoFill />
          </OverviewIcon>
          <OverviewState>
            <span>동영상</span>
            <small>30개+</small>
          </OverviewState>
        </OverviewItem>
      </Overview>
      <AccordionCurriculum />
    </Wrapper>
  );
}
