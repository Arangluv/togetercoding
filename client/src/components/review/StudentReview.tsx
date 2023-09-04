import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 70%;
  height: 16vw;
  background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
  border-radius: 20px;
  margin-bottom: 1.5vw;
  display: flex;
`;

const ProfileInfoBox = styled.div`
  width: 20%;
  height: 16vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
    margin: 0.5vw 0;
    font-size: 1.2vw;
  }
  small {
    color: #bdc3c7;
  }
`;
const ProfileImageBox = styled.div`
  width: 6vw;
  height: 6vw;
  border-radius: 100%;
  margin-bottom: 0.5vw;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
`;
const ReviewContentBox = styled.div`
  width: 80%;
  height: 16vw;
  padding: 2vw;
  h2 {
    font-weight: 700;
    font-size: 1.3vw;
    color: ${(props) => props.theme.textColor};
    margin-bottom: 1vw;
    display: flex;
    justify-content: space-between;
    a {
      color: #3498db;
      transition: all 0.1s ease-in-out;
      &:hover {
        filter: brightness(1.5);
      }
    }
  }
  p {
    line-height: 1.5;
    font-size: 1.2vw;
    width: 80%;
    color: #bdc3c7;
  }
`;
export default function StudentReview() {
  return (
    <Wrapper>
      <ProfileInfoBox>
        <ProfileImageBox>
          <img
            src="https://i.namu.wiki/i/pWjwjQ8g8PHy37F-IQvM0qmUH6-NhCH0mLeMGrBArerxV_eATwJT_7rgdHcUhWZrRWG-TF7nMY7BiD0YSu5Tbg.webp"
            alt="student profile image"
          />
        </ProfileImageBox>
        <span>Pamhani</span>
        <small>2023.07.03</small>
      </ProfileInfoBox>
      <ReviewContentBox>
        <h2>
          React로 배우는 나만의 심리테스트<Link to="#">강의 바로가기</Link>
        </h2>
        <p>
          교육의 자주성·전문성·정치적 중립성 및 대학의 자율성은 법률이 정하는
          바에 의하여 보장된다. 대법원장과 대법관이 아닌 법관은 대법관회의의
          동의를 얻어 대법원장이 임명한다. 국민의 모든 자유와 권리는
          국가안전보장·질서유지 또는 공공복리를 위하여 필요한 경우에 한하여
          법률로써 제한할 수 있으며, 제한하는 경우에도 자유와 권리의 본질적인
          내용을 침해할 수 없다.
        </p>
      </ReviewContentBox>
    </Wrapper>
  );
}
