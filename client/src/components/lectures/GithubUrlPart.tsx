import styled from "styled-components";
import { AiOutlineGithub } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { subLectureListState } from "../../atom/atoms";
import { useEffect, useState } from "react";
const Wrapper = styled.div`
  width: 100%;
  height: 10vh;
  margin: 1vw 0;
  padding: 0 1vw;
`;
const GithubLink = styled.a`
  display: flex;
  width: 20%;
  align-items: center;
  justify-content: center;
  padding: 1vw;
  color: ${(props) => props.theme.textColor};
  border: 1px solid ${(props) => props.theme.textColor};
  border-radius: 30px;
  transition: all 0.1s ease-in-out;
  &#github_link {
    margin-top: 0;
  }
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.bgColor};
    background-color: ${(props) => props.theme.textColor};
  }
  svg {
    width: 2vw;
    height: 2vw;
    margin-right: 1vw;
  }
`;
export default function GithubUrlPart() {
  const lectureId = useLocation().pathname.split("/")[3];
  const subLectureList = useRecoilValue(subLectureListState);
  const [gitUrl, setGitUrl] = useState("");
  useEffect(() => {
    if (!lectureId || !subLectureList) {
      return;
    }
    const findIdx = subLectureList.findIndex(
      (lecture) => lecture._id === lectureId
    );
    if (findIdx === -1) {
      return;
    }
    if (!subLectureList[findIdx].githubUrl) {
      setGitUrl("");
      return;
    }
    setGitUrl(subLectureList[findIdx].githubUrl);
  }, [lectureId]);
  return gitUrl === "" ? null : (
    <Wrapper>
      <GithubLink href={gitUrl} target="_blank">
        <AiOutlineGithub />
        <span>소스코드 보러가기</span>
      </GithubLink>
    </Wrapper>
  );
}
