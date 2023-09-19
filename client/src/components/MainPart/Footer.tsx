import styled from "styled-components";
import { AiFillYoutube } from "react-icons/ai";
import { TbSquareLetterB } from "react-icons/tb";
const Wrapper = styled.div`
  width: 100%;
  height: 26vh;
  position: absolute;
  bottom: 0;
  /* background-image: linear-gradient(to right, #434343 0%, black 100%); */
  background-color: #2d3436;

  padding: 1vw 3vw;
`;
const CopyRightPart = styled.div`
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
  svg {
    color: white;
    margin: 0 1vw;
    width: 2vw;
    height: 2vw;
  }
`;
export default function Footer() {
  return (
    <Wrapper>
      <CopyRightPart>
        Copyright &copy; 같이코딩 All Rights Reserved.
        <SnsInfo>
          <AiFillYoutube />
          <TbSquareLetterB />
        </SnsInfo>
      </CopyRightPart>
      <InfoPart>
        <BussinessInfo>
          <span>대표: 류현수</span>
          <span>사업자 등록번호: 212-26-14752 온라인 교육학원업</span>
          <span>통신판매업신고번호 : 제 0000-대전어디-0000 호</span>
          <span>문의 : test@contactus.gmail.com</span>
        </BussinessInfo>
      </InfoPart>
    </Wrapper>
  );
}
