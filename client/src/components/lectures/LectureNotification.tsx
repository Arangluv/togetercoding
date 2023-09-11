import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { subLectureListState } from "../../atom/atoms";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
const Wrapper = styled.article`
  width: 100%;
  height: auto;
  padding: 1vw;
  line-height: 1.6;
`;
const NotiContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: #385170;
  padding: 1vw;
  border-radius: 20px;
  a {
    color: #0092ca;
    font-weight: 600;
    transition: all 0.1s ease-in-out;
    &:hover {
      color: #defcf9;
    }
  }
  p {
    color: white;
    line-height: 1.6;
    color: white;
    font-size: 1.2vw;
    white-space: pre-wrap;
    overflow: hidden;
    word-wrap: break-word;
  }
`;
export default function LectureNotification() {
  const lectureId = useLocation().pathname.split("/")[3];
  const subLectureList = useRecoilValue(subLectureListState);
  const [lectureNoti, setLectureNoti] = useState("");
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
    if (subLectureList[findIdx].notice) {
      setLectureNoti(subLectureList[findIdx].notice);
      return;
    }
  }, [lectureId]);
  return lectureNoti !== "<p><br/></p>" ? (
    <Wrapper>
      <NotiContainer
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(lectureNoti) }}
      />
    </Wrapper>
  ) : null;
}
