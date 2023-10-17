import styled from "styled-components";
import { AiFillYoutube } from "react-icons/ai";
import { TbSquareLetterB } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { footerHeightState } from "../../atom/atoms";
import { Link } from "react-router-dom";
const Wrapper = styled.div`
  width: 100%;
  min-height: 26vh;
  height: auto;
  position: absolute;
  bottom: 0;
  background-color: #2d3436;
  padding: 1vw 2vw;
`;

const Navigation = styled.div`
  width: 100%;
  padding: 0 1vw;
  margin-top: 1vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: linear-gradient(
    to top,
    #d5d4d0 0%,
    #d5d4d0 1%,
    #eeeeec 31%,
    #efeeec 75%,
    #e9e9e7 100%
  );
  color: transparent;
  -webkit-background-clip: text;
  font-weight: 600;
`;

const TermsContainer = styled.ul`
  width: 30%;
  padding: 1vw 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  li {
    transition: all 1s ease-in-out;
    &:hover {
      cursor: pointer;
      a {
        filter: brightness(0.9);
      }
    }
    a {
      color: ${(props) => props.theme.textColor};
    }
  }

  li:not(:first-child) {
    padding: 0 1vw;
  }
`;

const InfoPart = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin-top: 1vw;
  padding: 1vw;
`;
const BussinessInfo = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  span {
    margin-bottom: 0.5vw;
    background-image: linear-gradient(
      to top,
      #d5d4d0 0%,
      #d5d4d0 1%,
      #eeeeec 31%,
      #efeeec 75%,
      #e9e9e7 100%
    );
    color: transparent;
    -webkit-background-clip: text;
  }
`;
const SnsInfo = styled.div`
  width: 50%;
  /* height: 100%; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  a {
    display: flex;
    align-items: center;
  }
  svg {
    color: white;
    margin: 0 1vw;
    width: 2vw;
    height: 2vw;
  }
`;
export default function Footer() {
  const ref = useRef<null | HTMLDivElement>(null);
  const setFooterHeight = useSetRecoilState(footerHeightState);
  useEffect(() => {
    if (!ref) {
      return;
    }
    setFooterHeight(ref.current?.offsetHeight);
  }, [ref]);
  return (
    <Wrapper ref={ref}>
      <Navigation>
        <TermsContainer>
          <li>
            <Link to="#">이용약관</Link>
          </li>
          <li>
            <Link to="#">개인정보처리방침</Link>
          </li>
          <li>
            <Link to="#">취소및환불정책</Link>
          </li>
        </TermsContainer>
        <SnsInfo>
          <a
            href="https://www.youtube.com/channel/UCZBb3nGVrWCydwmY-CAvcOg"
            target="_blank"
          >
            <AiFillYoutube />
          </a>
          <a href="https://freefrompoverty.tistory.com/" target="_blank">
            <TbSquareLetterB />
          </a>
        </SnsInfo>
      </Navigation>
      <InfoPart>
        <BussinessInfo>
          <span>대표: 류현수</span>
          <span>사업자 등록번호: 212-26-14752 온라인 교육학원업</span>
          <span>통신판매업신고번호 : 제 0000-대전어디-0000 호</span>
          <span>문의 : test@contactus.gmail.com</span>
          <span>Copyright &copy; 같이코딩 All Rights Reserved.</span>
        </BussinessInfo>
      </InfoPart>
    </Wrapper>
  );
}
