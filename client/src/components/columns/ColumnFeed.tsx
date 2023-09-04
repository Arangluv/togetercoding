import styled from "styled-components";
import { motion } from "framer-motion";
const Wrapper = styled(motion.article)`
  width: 100%;
  height: 35vw;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ColumnImageBox = styled.div`
  width: 100%;
  height: 100%;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
`;
const ColumnContentBox = styled.div`
  width: 90%;
  height: 10vw;
  border-radius: 20px;
  position: relative;
  top: -10%;
  background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
  display: flex;
  justify-content: center;
  padding: 2vw;
  h2 {
    font-size: 1.3vw;
    font-family: 600;
    color: white;
    line-height: 1.5;
  }
`;
export default function ColumnFeed() {
  return (
    <Wrapper whileHover={{ scale: 1.02 }}>
      <ColumnImageBox>
        <img
          src="https://tecoble.techcourse.co.kr/static/348a6c1ea3a4fa8b6990e3e3bf4e8490/8ac6f/sample2.png"
          alt="칼럼 피드 대표 썸네일"
        />
      </ColumnImageBox>
      <ColumnContentBox>
        <h2>당신이 웹개발자로 '잘' 성장하기 위한 필요한 3가지</h2>
      </ColumnContentBox>
    </Wrapper>
  );
}
