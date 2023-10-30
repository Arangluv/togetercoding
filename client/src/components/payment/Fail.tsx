import styled from "styled-components";
import { BiErrorCircle } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  background: ${(props) => props.theme.bgImage};
`;
const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FailBox = styled.div`
  width: 70%;
  height: 70vh;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vw 0;
  svg {
    width: 6vw;
    height: 6vw;
    box-shadow: 0px 0px 10px rgba(231, 76, 60, 0.5);
    border-radius: 100%;
    color: ${(props) => props.theme.errorColor};
    margin-bottom: 2vw;
  }
  #fail-text {
    font-size: 2vw;
    font-weight: 600;
    color: #222831;
    margin-bottom: 0.5vw;
  }
  #order-id {
    color: rgba(34, 40, 49, 0.8);
    margin-bottom: 0.5vw;
    span {
      color: #222831;
      font-weight: 600;
    }
  }
`;
export default function Fail() {
  const [searchParams] = useSearchParams();
  return (
    <>
      <Wrapper></Wrapper>
      <Overlay>
        <FailBox>
          <BiErrorCircle />
          <span id="fail-text">결제에 실패했습니다</span>
          <small id="order-id">
            사유: <span>{searchParams.get("message")}</span>
          </small>
        </FailBox>
      </Overlay>
    </>
  );
}
