import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  min-height: 126vh;
  height: auto;
  padding-bottom: 26vh;
  background: ${(props) => props.theme.bgImage};
  padding-top: 17vh;
`;
const PaymentWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2vw;
`;
const PaymentSummary = styled.div`
  width: 100%;
  height: 100%;
  padding: 4vw;
  display: flex;
  flex-direction: column;
  h3 {
    color: ${(props) => props.theme.textColor};
    font-size: 1.5vw;
    font-weight: 600;
    margin-bottom: 2vw;
  }
  #lecture-thumbnail__container {
    width: 100%;
    height: 50%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #lecture-image-box {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  #lecture-title__container {
    position: absolute;
    width: 80%;
    height: 15vh;
    bottom: -25%;
    background-color: #233142;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 2vw;
    color: ${(props) => props.theme.textColor};
    h4 {
      font-size: 1.3vw;
      margin-bottom: 1vw;
    }
    span {
      font-size: 1.2vw;
      line-height: 1.5;
    }
  }
`;
const PaymentSelect = styled.div`
  width: 100%;
  height: 100%;
  padding: 4vw;
  display: flex;
  flex-direction: column;
  h3 {
    color: ${(props) => props.theme.textColor};
    font-size: 1.5vw;
    font-weight: 600;
    margin-bottom: 2vw;
  }
  form {
    display: flex;
    flex-direction: column;
    label {
      border: 1px dotted ${(props) => props.theme.textColor};
      padding: 1vw 1vw;
      border-radius: 10px;
      margin-bottom: 1vw;
      span {
        color: ${(props) => props.theme.textColor};
        margin-left: 1vw;
        font-size: 1.4vw;
        font-weight: 600;
      }
    }
    label:focus-within {
      background-color: ${(props) => props.theme.successColor};
      border-color: ${(props) => props.theme.successColor};
    }
  }
  #std-purchase-submit {
    margin-top: 2vw;
    border: none;
    text-align: center;
    padding: 1.5vw 0;
    background-color: ${(props) => props.theme.errorColor};
    input[type="submit"] {
      display: none;
    }
  }
  #line-break {
    width: 100%;
    border: 1px solid white;
    margin-top: 1vw;
    margin-bottom: 2vw;
  }
  #purchase-info {
    display: flex;
    justify-content: space-between;
    span,
    small {
      color: ${(props) => props.theme.textColor};
      font-size: 1.5vw;
    }
  }
`;
export default function PaymentScreen() {
  console.log("payment스크린");
  return (
    <Wrapper>
      <PaymentWrapper>
        <PaymentSummary>
          <h3>구매내용</h3>
          <div id="lecture-thumbnail__container">
            <div id="lecture-image-box">
              <img
                src="https://academy.dream-coding.com/_next/image?url=https%3A%2F%2Fd2lmphbmp3ptuw.cloudfront.net%2Fassets%2FJava_Script_Course_Thumbnail_ebd55f8582.gif&w=3840&q=75"
                alt="purchase lecture thumbnail"
              />
            </div>
            <div id="lecture-title__container">
              <h4>강의 제목</h4>
              <span>
                강의에 대한 짧은 설명이 들어가게되고 이 부분은 한 이정도의
                길이를 가질 것으로 예상됩니다
              </span>
            </div>
          </div>
        </PaymentSummary>
        <PaymentSelect>
          <h3>결제수단 선택</h3>
          <form action="">
            <label htmlFor="card">
              <input id="card" type="radio" name="payment-method" />
              <span>카드결제</span>
            </label>
            <label htmlFor="toss">
              <input id="toss" type="radio" name="payment-method" />
              <span>토스페이</span>
            </label>
            <label htmlFor="kakao-pay">
              <input id="kakao-pay" type="radio" name="payment-method" />
              <span>카카오페이</span>
            </label>
            <div id="line-break"></div>
            <div id="purchase-info">
              <span>결제금액</span>
              <small>
                <span>₩</span>350,000
              </small>
            </div>
            <label id="std-purchase-submit" htmlFor="purchase-submit">
              <span>결제하기</span>
              <input id="purchase-submit" type="submit" />
            </label>
          </form>
        </PaymentSelect>
      </PaymentWrapper>
    </Wrapper>
  );
}
