import styled from "styled-components";
import LectureList from "./LectureList";
import { useLocation, useParams } from "react-router-dom";
import { useLectureTitleQuery } from "../../hooks/lecture";

const Wrapper = styled.div`
  width: 25%;
  height: 100vh;
  position: fixed;
  background-color: #222f3e;
  border-right: 1px solid rgba(227, 227, 227, 0.1);
  left: 0;
`;
const ProgressiveContainer = styled.div`
  width: 100%;
  height: 15vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1vw;
  border-bottom: 1px solid #808e9b;
  h2 {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: pre-wrap;
      color: ${(props) => props.theme.textColor};
      font-weight: 600;
      font-size: 1.3vw;
      display: block;
      width: 80%;
    }
    small {
      color: #0097e6;
      font-weight: 600;
    }
  }
`;
const ProgressiveBar = styled.div`
  width: 100%;
  height: 2vh;
  border-radius: 20px;
  /* border: 1px solid blue; */
  margin-top: 1vw;
  background-color: ${(props) => props.theme.textColor};
  display: flex;
`;
const ProgressiveStateBar = styled.div`
  height: 100%;
  border-radius: 20px;
  background-color: #0097e6;
  filter: brightness(1.3);
`;
export default function LectureSideBar() {
  const urlName = useLocation().pathname.split("/")[1];
  const { lectureTitleData, lectureTitleDataLoading } = useLectureTitleQuery(
    urlName ? urlName : ""
  );
  return (
    <Wrapper>
      <ProgressiveContainer>
        <h2>
          <span>{lectureTitleData?.name}</span>
          <small>
            {lectureTitleData
              ? `${(
                  (lectureTitleData.completeLectureQuantity /
                    lectureTitleData.totalLectureQuantity) *
                  100
                ).toFixed(0)}%`
              : null}
          </small>
        </h2>
        <ProgressiveBar>
          <ProgressiveStateBar
            style={{
              width: lectureTitleData
                ? `${
                    (lectureTitleData.completeLectureQuantity /
                      lectureTitleData.totalLectureQuantity) *
                    100
                  }%`
                : "0%",
            }}
          ></ProgressiveStateBar>
        </ProgressiveBar>
      </ProgressiveContainer>
      <LectureList />
    </Wrapper>
  );
}
