import styled from "styled-components";
import { motion } from "framer-motion";
const Wrapper = styled.div`
  width: 80%;
  padding-right: 5vw;
  height: 82vh;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  padding-left: 2vw;
  padding-bottom: 3vw;
`;
const Title = styled.div`
  height: 5vh;
  width: 100%;
  border-bottom: 2px solid #ecf0f1;
  display: flex;
  align-items: center;
  padding-bottom: 1vw;
  h2 {
    font-size: 1.3vw;
    font-weight: 600;
    color: #ecf0f1;
  }
`;
const CertificationBox = styled.div`
  margin-top: 2vw;
  display: grid;
  width: 100%;
  height: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`;
const CertificationItem = styled(motion.article)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60vh;
  border-radius: 20px;
  position: relative;
  background-color: #1a2027;
  &:hover {
    cursor: pointer;
  }
`;
const ItemImage = styled.div`
  width: 100%;
  height: 65%;
  img {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    object-fit: fill;
    width: 100%;
    height: 100%;
  }
`;
const ItemTitle = styled.div`
  padding: 1vw;
  h2 {
    color: ${(props) => props.theme.textColor};
    font-size: 1.2vw;
    font-weight: 600;
    line-height: 1.5;
  }
`;
const CompleteText = styled.span`
  color: #66bb69;
  font-size: 1.5vw;
  font-weight: 600;
  filter: brightness(1.2);
  position: absolute;
  left: 50%;
  bottom: 1vw;
  transform: translateX(-50%);
`;
export default function Certificates() {
  return (
    <Wrapper>
      <Title>
        <h2>수료증</h2>
      </Title>
      <CertificationBox>
        <CertificationItem whileHover={{ scale: 1.05 }}>
          <ItemImage>
            <img
              src="https://i.ytimg.com/vi/dIaR5Z4Gwig/maxresdefault.jpg"
              alt="완료한 강의에 대한 대표 썸네일"
            />
          </ItemImage>
          <ItemTitle>
            <h2>리액트로 심리테스트를 만들어보자 ! 수익화 완전 정복</h2>
          </ItemTitle>
          <CompleteText>Complete !</CompleteText>
        </CertificationItem>
        <CertificationItem whileHover={{ scale: 1.05 }}>
          <ItemImage>
            <img
              src="https://i.ytimg.com/vi/dIaR5Z4Gwig/maxresdefault.jpg"
              alt="완료한 강의에 대한 대표 썸네일"
            />
          </ItemImage>
          <ItemTitle>
            <h2>리액트로 심리테스트를 만들어보자 ! 수익화 완전 정복</h2>
          </ItemTitle>
          <CompleteText>Complete !</CompleteText>
        </CertificationItem>
        <CertificationItem whileHover={{ scale: 1.05 }}>
          <ItemImage>
            <img
              src="https://i.ytimg.com/vi/dIaR5Z4Gwig/maxresdefault.jpg"
              alt="완료한 강의에 대한 대표 썸네일"
            />
          </ItemImage>
          <ItemTitle>
            <h2>리액트로 심리테스트를 만들어보자 ! 수익화 완전 정복</h2>
          </ItemTitle>
          <CompleteText>Complete !</CompleteText>
        </CertificationItem>
        <CertificationItem whileHover={{ scale: 1.05 }}>
          <ItemImage>
            <img
              src="https://i.ytimg.com/vi/dIaR5Z4Gwig/maxresdefault.jpg"
              alt="완료한 강의에 대한 대표 썸네일"
            />
          </ItemImage>
          <ItemTitle>
            <h2>리액트로 심리테스트를 만들어보자 ! 수익화 완전 정복</h2>
          </ItemTitle>
          <CompleteText>Complete !</CompleteText>
        </CertificationItem>
        <CertificationItem whileHover={{ scale: 1.05 }}>
          <ItemImage>
            <img
              src="https://i.ytimg.com/vi/dIaR5Z4Gwig/maxresdefault.jpg"
              alt="완료한 강의에 대한 대표 썸네일"
            />
          </ItemImage>
          <ItemTitle>
            <h2>리액트로 심리테스트를 만들어보자 ! 수익화 완전 정복</h2>
          </ItemTitle>
          <CompleteText>Complete !</CompleteText>
        </CertificationItem>
      </CertificationBox>
    </Wrapper>
  );
}
