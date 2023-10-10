import styled from "styled-components";
import { motion, progress } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLectureProgressQuery } from "../../hooks/lecture";
const Wrapper = styled(motion.div)`
  width: 100%;
  height: 30vw;
  border-radius: 20px;
  background-color: rgba(99, 110, 114, 0.5);
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
`;
const LectureImage = styled.div`
  width: 100%;
  height: 65%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
`;
const LectureTitle = styled.div`
  margin-top: 1vw;
  width: 100%;
  height: 15%;
  padding: 0 1vw;
  h2 {
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    font-size: 1.3vw;
  }
`;
const LectureProgressContainer = styled.div`
  width: 100%;
  height: calc(20% - 1vw);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 0.5vw;
  span {
    margin-top: 1vw;
    font-size: 1.3vw;
    color: white;
    font-weight: 600;
  }
`;
const ProgressBar = styled.div<ProgressState>`
  width: 90%;
  height: 1vw;
  border-radius: 10px;
  background-color: #dfe4ea;
  div {
    border-radius: 10px;
    width: ${(props) => `${props.progressState}%`};
    height: 100%;
    background-color: #5352ed;
    filter: ${(props) =>
      props.progressState === 1 ? "brightness(1.5)" : "brightness(1)"};
  }
`;
interface ProgressState {
  progressState: number;
}
interface IProps {
  totalLectureQuantity: number;
  name: string;
  thumbnail: string;
  urlName: string;
}
export default function ListenedLecture({
  totalLectureQuantity,
  name,
  thumbnail,
  urlName,
}: IProps) {
  const navigator = useNavigate();
  const progressData = useLectureProgressQuery(name);
  console.log("progressData");
  console.log(progressData);
  // stduent
  // lectureProgress: [
  //   {
  //     lectureName: '기초부터 배우는 html-css',
  //     completeLectureQuantity: 2,
  //     _id: ObjectId("6513c9b199a799f60bfeef3c")
  //   }
  // ],

  // lectures
  // totalLectureQuantity: 2,
  return (
    <Wrapper
      whileHover={{ scale: 1.01 }}
      onClick={() => navigator(`/${urlName}/lectures`)}
    >
      <LectureImage>
        <img src={thumbnail} alt="강의사진의 대표 썸네일" />
      </LectureImage>
      <LectureTitle>
        <h2>{name}</h2>
      </LectureTitle>
      <LectureProgressContainer>
        <ProgressBar progressState={progressData / totalLectureQuantity}>
          <div
            style={{ width: `${(progressData / totalLectureQuantity) * 100}%` }}
          ></div>
        </ProgressBar>
        <span>{`${(Number(progressData / totalLectureQuantity) * 100).toFixed(
          0
        )}% 완료`}</span>
      </LectureProgressContainer>
    </Wrapper>
  );
}
