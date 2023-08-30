import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineArrowRight } from "react-icons/ai";
const Wrapper = styled.div`
  width: 100%;
  height: 25vh;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3vw;
`;
const TitleContent = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 2.5vw;
    color: ${(props) => props.theme.textColor};
    font-weight: 700;
    margin-bottom: 0.5vw;
  }
  small {
    font-size: 1.5vw;
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    margin-bottom: 0.5vw;
  }
  a {
    width: 50%;
    /* padding: 1vw 3vw; */
    border: 1px solid red;
    border-radius: 10px;
    font-size: 1.3vw;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3vw;
    svg {
      margin-left: 0.5vw;
    }
  }
  .btn-grad {
    background-image: linear-gradient(
      to right,
      #ff512f 0%,
      #dd2476 51%,
      #ff512f 100%
    );
    padding: 10px 30px;
    text-align: center;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;
    /* box-shadow: 0 0 20px #eee; */
    border-radius: 10px;
    display: block;
  }

  .btn-grad:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }
`;
const TitleImage = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  img {
    width: 500px;
    height: 350px;
    object-fit: contain;
  }
`;
export default function Title() {
  return (
    <Wrapper>
      <TitleContent>
        <h1>[풀스택] 에어비앤비 클론코딩</h1>
        <small>블로그, 인스타그램 클론코딩을 통한 실전팁까지!</small>
        <Link to="#" className="btn-grad ">
          강의등록 바로가기
          <AiOutlineArrowRight />
        </Link>
      </TitleContent>
      <TitleImage>
        <img
          src="https://nomadcoders.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero.404e1252.png&w=3840&q=75"
          alt=""
        />
      </TitleImage>
    </Wrapper>
  );
}
