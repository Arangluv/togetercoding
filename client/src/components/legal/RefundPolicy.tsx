import styled from "styled-components";

const Wrapper = styled.div`
  width: 80%;
  min-height: 100vh;
  height: 200vh;
  background-color: rgba(20, 16, 16, 0.8);
  margin: 4vw 0;
  border-radius: 5%;
  padding: 4vw 3vw;
  h2 {
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    font-size: 2vw;
    text-align: center;
  }
`;
const TermsContainer = styled.article`
  display: flex;
  flex-direction: column;
  div {
    margin: 2vw 0;
  }
  h3 {
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    font-size: 1.3vw;
  }
  p {
    color: ${(props) => props.theme.textColor};
    font-size: 1.1vw;
    line-height: 1.6;
    margin-top: 1vw;
    white-space: pre-wrap;
  }
`;

export default function RefundPolicy() {
  return (
    <Wrapper>
      <h2>취소및환불정책</h2>
      <TermsContainer>
        <div>
          <h3>제 1조 (목적)</h3>
          <p>
            드림코딩(이하 '회사'라고 함)는 회사가 제공하고자 하는 서비스(이하
            '회사 서비스')를 이용하는 개인(이하 '이용자' 또는 '개인')의
            정보(이하 '개인정보')를 보호하기 위해, 개인정보보호법, 정보통신망
            이용촉진 및 정보보호 등에 관한 법률(이하 '정보통신망법') 등 관련
            법령을 준수하고, 서비스 이용자의 개인정보 보호 관련한 고충을
            신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이
            개인정보처리방침(이하 '본 방침')을 수립합니다.
          </p>
        </div>
      </TermsContainer>
    </Wrapper>
  );
}
