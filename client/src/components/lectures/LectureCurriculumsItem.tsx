import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { studentMainTheme } from "../../atom/atoms";

const Wrapper = styled.div<IsTakenStyleProps>`
  width: 100%;
  height: 6vh;
  background-color: #636e72;
  padding: 0.5vw 1vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.1px solid #b2bec3;
  filter: ${(props) => (props.isTaken ? "brightness(0.7)" : "brightness(1)")};
  &:hover {
    cursor: pointer;
  }
  span {
    color: white;
  }
  a {
    display: flex;
    align-items: center;
    font-weight: 600;
    color: white;
    height: 100%;
    font-size: 1vw;
    padding: 0.5vw 1.5vw;
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
interface IsTakenStyleProps {
  isTaken: boolean;
}
interface IProps {
  name: string;
  isTaken: boolean;
  lectureId: string;
  mainLectureId: string;
}
export default function LectureCurriculumsItem({
  name,
  isTaken,
  lectureId,
  mainLectureId,
}: IProps) {
  const navigator = useNavigate();
  const setStudentMainThemeState = useSetRecoilState(studentMainTheme);
  console.log("lecture 커리큘럼에서 isTaken ?");
  console.log(isTaken);
  const handleCurriculumsClick = () => {
    setStudentMainThemeState(mainLectureId);
    navigator(lectureId);
  };
  return (
    <Wrapper isTaken={isTaken} onClick={() => handleCurriculumsClick()}>
      <span>{name}</span>
      <Link to={lectureId}>수강하기</Link>
    </Wrapper>
  );
}
