import styled from "styled-components";
import MainCard from "./MainPart/Card";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  /* background-color: ${(props) => props.theme.bgColor}; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-image: linear-gradient(to right, #434343 0%, black 100%);
`;
const MainTitle = styled.div`
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 24vw;
  h2 {
    margin-bottom: 1vw;
    font-size: 3vw;
    font-weight: 700;
  }
  h3 {
    font-size: 2.5vw;
    font-weight: 600;
  }
`;
const BtnContainer = styled(motion.div)`
  margin-top: 2vw;
`;
const StyledBtn = styled(Button)`
  width: 400px;
  height: 50px;
  background-color: red;
  svg {
    margin-left: 0.5vw;
  }
  a {
    background-color: ${(props) => props.theme.textColor};
    color: red;
  }
`;
const MainCardContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  position: absolute;
  align-items: center;
  margin-top: 10vw;
  justify-content: space-around;
  bottom: 4vw;
`;
const StyledSlider = styled(Slider)`
  width: 1100px;
  height: auto;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  .slick-slider {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
  .slick-slide.slick-active.slick-current {
    div {
      display: flex;
      justify-content: center;
    }
  }
  button {
    display: none !important;
  }
`;
const h2Variant = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};
const h3Variant = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
};
const btnVariant = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      delay: 1,
    },
  },
};
const imageVarinat = {
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      delay: 1.5,
    },
  },
};
export default function MainFirst() {
  const settings = {
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    // slidesToScroll: 1,
    pauseOnHover: false,
  };
  return (
    <Wrapper>
      <MainTitle>
        <motion.h2 variants={h2Variant} initial="hidden" animate="visible">
          계산기는 이제 그만 만들어요
        </motion.h2>
        <motion.h3 variants={h3Variant} initial="hidden" animate="visible">
          수익을 목적으로 둔 코딩으로 동기부여 확실하게
        </motion.h3>
        <BtnContainer variants={btnVariant} initial="hidden" animate="visible">
          <StyledBtn
            color="error"
            variant="contained"
            href="#outlined-buttons"
            disableRipple
          >
            강의 보러가기
            <WhatshotIcon />
          </StyledBtn>
        </BtnContainer>
      </MainTitle>
      <MainCardContainer
        variants={imageVarinat}
        initial="hidden"
        animate="visible"
      >
        <StyledSlider {...settings}>
          <MainCard
            title="수익화를 위해 코딩하자!"
            subTitle="프로젝트도 만들면서 돈을 벌 수 있다고?"
            content={[
              "요즘 핫한 성격 테스트를 SPA 사이트 만들기",
              "프로젝트에 애드센스 붙이기",
              "애널리틱스를 활용해 트래픽 감시하기",
              "React 기술 스택 향상",
            ]}
            background="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);"
            iconType="money"
          />
          <MainCard
            title="본인만의 포트폴리오도 챙기자!"
            subTitle="직접 코드를 치면서 만드는 나만의 포트폴리오"
            content={["트렌디한 나만의 포트폴리오", "심리테스트"]}
            background="linear-gradient(to top, #ebbba7 0%, #cfc7f8 100%);"
            iconType="portfolio"
          />
          <MainCard
            title="단기간 실력향상 🔥"
            subTitle="코드만 따라치지마요. 내가 직접만들면서 실력도 키우기"
            content={[
              "요즘 핫한 성격 테스트를 SPA 사이트 만들기",
              "프로젝트에 애드센스 붙이기",
              "애널리틱스를 활용해 트래픽 감시하기",
              "React 기술 스택 향상",
            ]}
            background="linear-gradient(to top, #9795f0 0%, #fbc8d4 100%);"
            iconType="up-graph"
          />
        </StyledSlider>
        {/* <MainCard
          title="웹사이트 수익화 💲"
          content="'웹사이트 수익화'라는 분명한 목적을 가지고 코딩합니다. 사람마다 동기부여가 되는 요소가 다르지만, 그 중에서 돈은 사람을 움직이게 하는 큰 힘이라고 생각하며 공부 혹은 프로젝트를 진행하는데 있어 포기하지않고 끝까지 갈 수 있는 힘을 실어드립니다 "
          thumbnail="https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/EQa/image/FI23I5ETNWtiOnPEJbVuyQ5rBDY"
        />
        <MainCard
          title="본인만의 포트폴리오 📑"
          content="실습을 진행하며, 퀄리티있는 프로젝트를 스스로 코딩하여 만들어봅니다. 실력도 높이며 자신만의 포트폴리오를 만들어보세요!"
          thumbnail="https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/EQa/image/FI23I5ETNWtiOnPEJbVuyQ5rBDY"
        />
        <MainCard
          title="단기간 실력향상 🔥"
          content="받아쓰기 코딩이 아닌 능동적으로 사고하며, 백지부터 본인만의 프로젝트를 하나부터 써내려가는 것이 제 경험상 가장 가파른 실력향상을 가져다 줄 수 있는 지름길이었습니다. 강의마다 주어진 퀘스트를 정복하면서 가파른 실력향상을 경험하세요"
          thumbnail="https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/EQa/image/FI23I5ETNWtiOnPEJbVuyQ5rBDY"
        /> */}
      </MainCardContainer>
    </Wrapper>
  );
}
