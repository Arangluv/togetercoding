import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 6vh;
  background-color: #636e72;
  padding: 0.5vw 2vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.1px solid #b2bec3;
  span {
    color: white;
  }
  a {
    font-weight: 600;
    color: white;
    display: flex;
    align-items: center;
    font-size: 1vw;
    padding: 0.5vw 1vw;
    background-color: white;
    color: #353b48;
    border-radius: 10px;
    svg {
      width: 1.5vw;
      height: 1.5vw;
      margin-left: 0.5vw;
    }
    transition: all 0.1s ease-in-out;
    &:hover {
      color: #0097e6;
      filter: brightness(1.3);
    }
  }
`;

export default function CurriculumsItem() {
  return (
    <Wrapper>
      <span>#0.0 강의 소개</span>
      <Link to="#">수강하기</Link>
    </Wrapper>
  );
}
