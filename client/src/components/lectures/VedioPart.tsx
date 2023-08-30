import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { subLectureListState } from "../../atom/atoms";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  width: 100%;
  height: 60vh;
  padding: 1vw;
`;
const VedioContainer = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export default function VedioPart() {
  const subLectureList = useRecoilValue(subLectureListState);
  const lectureId = useLocation().pathname.split("/")[3];
  const [videoUrl, setVideoUrl] = useState("");
  const navigator = useNavigate();
  useEffect(() => {
    if (!subLectureList || !lectureId) {
      return;
    }
    const findIdx = subLectureList.findIndex(
      (lecture) => lecture._id === lectureId
    );
    if (findIdx === -1) {
      return;
    }
    setVideoUrl(subLectureList[findIdx].lectureLink);
  }, []);
  return (
    <Wrapper>
      <VedioContainer>
        <ReactPlayer
          url={videoUrl}
          playing={false}
          muted={true}
          controls={true}
          width={"100%"}
          height={"100%"}
          config={{
            file: {
              attributes: {
                crossOrigin: "true",
              },
              hlsOptions: {},
            },
          }}
        />
      </VedioContainer>
    </Wrapper>
  );
}
