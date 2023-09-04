import styled from "styled-components";
import StudentSliderReview from "../components/review/StudentSliderReview";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wrapper = styled.div`
  width: 100%;
  height: 115vh;
  background-image: linear-gradient(to right, #434343 0%, black 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const Title = styled.div`
  width: 100%;
  height: 5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3vw;
  h2 {
    font-size: 2vw;
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
  }
`;
const StyledSlider = styled(Slider)`
  && {
    .slick-arrow.slick-prev {
      display: none !important;
    }
    .slick-arrow.slick-next {
      display: none !important;
    }
  }
`;
const ReviewSlider = styled.article`
  width: 1000px;
  height: 400px;
`;
const FinishImageContainer = styled.div`
  width: 100%;
  height: 20vw;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.8);
    position: absolute;
  }
`;
const FinishContentBox = styled.div`
  width: 30%;
  height: 100%;
  margin: 0 1vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
  h3 {
    font-size: 4vw;
    margin-bottom: 1vw;
    font-weight: 700;
    color: ${(props) => props.theme.textColor};
    &:hover {
      small {
        transform: rotateY("60");
      }
    }
  }
  span {
    font-size: 1.3vw;
    font-weight: 500;
    color: #f1c40f;
    filter: brightness(1.2);
  }
`;
export default function MainLast() {
  const settings = {
    infinite: true,
    dots: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    swipe: false,
    // slidesToScroll: 1,
    pauseOnHover: false,
  };
  return (
    <Wrapper>
      <Title>
        <h2>수강생들의 후기에요</h2>
      </Title>
      <ReviewSlider>
        <StyledSlider {...settings}>
          <StudentSliderReview />
          <StudentSliderReview />
          <StudentSliderReview />
          <StudentSliderReview />
        </StyledSlider>
      </ReviewSlider>
      <FinishImageContainer>
        <img
          src="https://www.delt.net/wp-content/uploads/tips-for-learning-web-development.jpg"
          alt="홈페이지 소개 백그라운드 이미지"
        />
        <FinishContentBox>
          <h3>
            190<small>+</small>
          </h3>
          <span>190시간 이상의 강의들로 증명해요</span>
        </FinishContentBox>
        <FinishContentBox>
          <h3>3000+</h3>
          <span>이미 3000명 이상의 수강생들이 만족했어요</span>
        </FinishContentBox>
        <FinishContentBox>
          <h3>500+</h3>
          <span>500개 이상의 가치있는 컨텐츠가 있어요</span>
        </FinishContentBox>
      </FinishImageContainer>
    </Wrapper>
  );
}
