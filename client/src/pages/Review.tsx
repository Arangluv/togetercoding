import styled from "styled-components";
import StudentSliderReview from "../components/review/StudentSliderReview";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StudentReview from "../components/review/StudentReview";
const Wrapper = styled.div`
  width: 100%;
  min-height: 126vh;
  height: auto;
  padding-bottom: 26vh;
  background: ${(props) => props.theme.bgImage};
  display: flex;
  flex-direction: column;
  padding-top: 8vw;
  align-items: center;
`;
const Title = styled.div`
  width: 100%;
  height: 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2vw;
  h2 {
    font-size: 2vw;
    font-weight: 700;
    color: ${(props) => props.theme.textColor};
    margin-bottom: 0.5vw;
  }
  h3 {
    font-size: 1.7vw;
    font-weight: 600;
    color: #7f8c8d;
    margin-bottom: 0.5vw;
  }
  small {
    font-size: 1.2vw;
    color: #e74c3c;
  }
`;
const ReviewSlider = styled.article`
  width: 1000px;
  height: 400px;
`;
const StyledSlider = styled(Slider)`
  /* button {
    display: none !important;
  } */
`;
const ReviewContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  margin-top: 4vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default function Review() {
  const settings = {
    infinite: true,
    dots: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    swipe: false,
    // slidesToScroll: 1,
    pauseOnHover: false,
  };
  return (
    <Wrapper>
      <Title>
        <h2>같이코딩 리뷰</h2>
        <h3>같이코딩과 함께 성장하는 수강생들의 솔직한 리뷰!</h3>
        <small>
          정성스러운 리뷰로 같이코딩의 성장에 도움을 주신 많은 분들 감사드립니다
          :)
        </small>
      </Title>
      <ReviewSlider>
        <StyledSlider {...settings}>
          <StudentSliderReview />
          <StudentSliderReview />
          <StudentSliderReview />
          <StudentSliderReview />
        </StyledSlider>
      </ReviewSlider>
      <ReviewContainer id="review_container">
        <StudentReview />
        <StudentReview />
        <StudentReview />
        <StudentReview />
        <StudentReview />
      </ReviewContainer>
    </Wrapper>
  );
}
