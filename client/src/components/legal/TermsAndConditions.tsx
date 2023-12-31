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
export default function TermsAndConditions() {
  return (
    <Wrapper>
      <h2>이용약관</h2>
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
        <div>
          <h3>제 2조 (개인정보 처리의 원칙)</h3>
          <p>
            개인정보 관련 법령 및 본 방침에 따라 회사는 필요한 목적 범위
            내에서만 이용자의 개인정보를 수집할 수 있습니다.
          </p>
        </div>
        <div>
          <h3>제 3조 (회원 가입을 위한 정보)</h3>
          <p>
            {`회사는 이용자의 회사 서비스에 대한 회원가입을 위하여 다음과 같은 정보를 수집합니다.
필수 수집 정보: 이메일 주소, 이름 및 닉네임`}
          </p>
        </div>
        <div>
          <h3>제 4조 (개인정보 수집 방법)</h3>
          <p>
            {`회사는 다음과 같은 방법으로 이용자의 개인정보를 수집합니다.

이용자가 회사의 홈페이지에 자신의 개인정보를 입력하는 방식
어플리케이션 등 회사가 제공하는 홈페이지 외의 서비스를 통해 이용자가 자신의 개인정보를 입력하는 방식
SNS계정 (구글, 카카오, 깃헙)으로 가입/로그인시 OAuth 입력하는 방식`}
          </p>
        </div>
      </TermsContainer>
    </Wrapper>
  );
}
