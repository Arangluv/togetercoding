import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { MdManageAccounts, MdOutlinePayment } from "react-icons/md";
import FaqContent from "../components/faq-content/FaqContent";
const Wrapper = styled.div`
  width: 100%;
  min-height: 126vh;
  height: auto;
  padding-bottom: 26vh;
  background: ${(props) => props.theme.bgImage};
  padding-top: 17vh;
`;
const FaqContainer = styled.div`
  width: 100%;
  min-height: 80vh;
  height: auto;
  padding: 1vw;
  display: flex;
  flex-direction: column;
`;
const GuideBox = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 10vh;
  margin-bottom: 10vw;
`;
const GuideBoxItem = styled.div<PathProps>`
  width: 25%;
  height: 30vh;
  margin: 0 5vw;
  a {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: ${(props) => props.theme.textColor};
    padding: 1vw;
    border-radius: 20px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    transition: all 0.2s ease-in-out;
    background-color: ${(props) =>
      props.pathname ? "#222831" : "transparent"};
    &:hover {
      background-color: #222831;
    }
  }
  li {
    margin-bottom: 1vw;
    font-weight: 600;
    font-size: 1.3vw;
  }
  svg {
    width: 4vw;
    height: 4vw;
    margin-bottom: 1vw;
  }
  small {
    opacity: 0.8;
    font-size: 1.1vw;
  }
  #line-break-span {
    margin-bottom: 0.5vw;
  }
`;
interface PathProps {
  pathname: boolean;
}
export default function Faq() {
  const pathname = useLocation().pathname.split("/")[2];

  return (
    <Wrapper>
      <FaqContainer>
        <GuideBox>
          <GuideBoxItem pathname={pathname === "frequent-asked"}>
            <Link to="frequent-asked">
              <BsFillQuestionCircleFill />
              <li>자주 묻는 질문</li>
              <small>수강생들이 자주묻는 질문들을 모아보았어요</small>
            </Link>
          </GuideBoxItem>
          <GuideBoxItem pathname={pathname === "account"}>
            <Link to="account">
              <MdManageAccounts />
              <li>계정 / 로그인</li>
              <small>계정과 관련된 이슈가 궁금한가요?</small>
            </Link>
          </GuideBoxItem>
          <GuideBoxItem pathname={pathname === "payment"}>
            <Link to="payment">
              <MdOutlinePayment />
              <li>결제관련</li>
              <small>결제와 관련된 것이 궁금하나요?</small>
            </Link>
          </GuideBoxItem>
        </GuideBox>
        <Outlet />
      </FaqContainer>
    </Wrapper>
  );
}
