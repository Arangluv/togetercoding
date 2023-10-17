import styled from "styled-components";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const Wrapper = styled.div`
  width: 100%;
  min-height: 20vh;
  height: auto;
  margin: 4vw 0;
  display: flex;
  flex-direction: column;
  align-items: center;
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
const PaymentContainer = styled.div`
  width: 90%;
  height: 40vh;
  border-radius: 20px;
  background-image: linear-gradient(to right, #434343 0%, black 100%);
  padding: 2vw 3vw;
  display: flex;
`;
const ClassInfo = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h2 {
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    font-size: 2.5vw;
  }
  small {
    color: #b2bec3;
  }
`;
const ClassPaymentPart = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 3vw;
`;
const PaymentFirstItem = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    color: #636e72;
    text-decoration: line-through;
    font-size: 1.5vw;
  }
  svg {
    width: 1.5vw;
    height: 1.5vw;
    color: ${(props) => props.theme.textColor};
    margin: 0 1vw;
  }
  #discount {
    color: ${(props) => props.theme.textColor};
    text-decoration: none;
    font-weight: 600;
    font-size: 1.8vw;
  }
`;
const PaymentLastItem = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ApplayBtn = styled.button`
  & {
    background-image: linear-gradient(
      to right,
      #d31027 0%,
      #ea384d 51%,
      #d31027 100%
    );
    margin: 10px;
    padding: 15px 45px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;
    border-radius: 10px;
    display: block;
    width: 100%;
    font-size: 1.3vw;
    border: none;
  }

  &:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
    cursor: pointer;
  }
`;
interface IProps {
  lectureId: string;
}
export default function CoursePayment() {
  const navigator = useNavigate();
  // onClick={() => lecturePaymentMutate({ email, lectureName })}
  return (
    <Wrapper>
      <Title>
        <h2>수강신청하기</h2>
        <small>같이코딩과 함께 성장해요</small>
      </Title>
      <PaymentContainer>
        <ClassInfo>
          <h2>[풀스택] 에어비앤비 클론코딩</h2>
          <small>현재 20% 할인이 들어가고 있는 상품이에요</small>
        </ClassInfo>
        <ClassPaymentPart>
          <PaymentFirstItem>
            <span>₩150,000원</span>
            <AiOutlineArrowRight />
            <span id="discount">₩120,000원</span>
          </PaymentFirstItem>
          <PaymentLastItem>
            <ApplayBtn onClick={() => navigator("purchase-check")}>
              수강신청하기
            </ApplayBtn>
          </PaymentLastItem>
        </ClassPaymentPart>
      </PaymentContainer>
    </Wrapper>
  );
}
