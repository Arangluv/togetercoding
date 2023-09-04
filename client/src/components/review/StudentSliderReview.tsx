import styled from "styled-components";
import { PiUserCircleLight } from "react-icons/pi";
const Wrapper = styled.div`
  width: 1000px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3vw 0;
  /* background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%); */
  border-radius: 20px;
  h4 {
    color: #ecf0f1;
    font-size: 1.7vw;
    font-weight: 600;
    margin-bottom: 2vw;
  }
  p {
    width: 40%;
    white-space: pre-wrap;
    margin-bottom: 2vw;
    color: #dcdde1;
    font-size: 1.2vw;
    line-height: 1.5;
  }
`;
const StudentInfoBox = styled.div`
  width: 300px;
  margin-top: 1vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  svg {
    width: 3vw;
    height: 3vw;
    color: white;
  }
  span {
    color: white;
    font-size: 1.3vw;
    font-weight: 600;
    margin-top: 1vw;
  }
  small {
    color: #686de0;
    filter: brightness(1.4);
    font-size: 1.2vw;
    margin-top: 1vw;
  }
`;
export default function StudentSliderReview() {
  return (
    <Wrapper>
      <h4>별점을 안줄래야 안 줄수가 없다..</h4>
      <p>
        {`애드센스는 어떻게 달고, 내가 배운 걸 어떻게 적용해야하는지 막막했는데 이제야 길이 좀 보이네요..감사합니다 선생님 어디계셨었나요 ㅠㅠ`}
      </p>
      <StudentInfoBox>
        <PiUserCircleLight />
        <span>박00</span>
        <small>리액트로 만드는 나만의 심리테스트</small>
      </StudentInfoBox>
    </Wrapper>
  );
}
