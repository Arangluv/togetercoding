import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: auto;
  height: 2vw;
  position: absolute;
  right: 1vw;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  a {
    color: #34495e;
    transition: all 0.1s ease-in-out;
    &:hover {
      font-weight: 600;
      color: #2c3e50;
    }
  }
`;

export default function NoteLectureLink() {
  return (
    <Wrapper>
      <Link to="#">강의로 가기</Link>
    </Wrapper>
  );
}
