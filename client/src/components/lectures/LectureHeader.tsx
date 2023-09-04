import styled from "styled-components";
import { AiOutlineHome } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import { subLectureListState } from "../../atom/atoms";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const Wrapper = styled.header`
  width: 100%;
  height: 10vh;
  top: 0;
  left: 0;
  background-color: #1e272e;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2vw;
  svg {
    color: ${(props) => props.theme.textColor};
    width: 2vw;
    height: 2vw;
    transition: all 0.2s ease-in-out;
    &:hover {
      cursor: pointer;
      color: #0097e6;
    }
  }
  svg {
    color: ${(props) => props.theme.textColor};
    width: 2vw;
    height: 2vw;
    transition: all 0.2s ease-in-out;
    margin-right: 1vw;
    &:hover {
      cursor: pointer;
      color: #0097e6;
    }
  }
  h2 {
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
    font-size: 1.3vw;
  }
`;

export default function LectureHeader() {
  const subLectureList = useRecoilValue(subLectureListState);
  const lectureId = useLocation().pathname.split("/")[3];
  const [lectureTitle, setLectureTitle] = useState("");
  const navigator = useNavigate();
  useEffect(() => {
    if (!subLectureList || !lectureId) {
      return;
    }
    const lectureIdx = subLectureList.findIndex(
      (lecture) => lecture._id === lectureId
    );
    if (lectureIdx === -1) {
      setLectureTitle("loading..");
      return;
    }
    setLectureTitle(subLectureList[lectureIdx].name);
  });
  return (
    <Wrapper>
      <AiOutlineHome onClick={() => navigator("/")} />
      <h2>{lectureTitle}</h2>
      <div></div>
    </Wrapper>
  );
}
