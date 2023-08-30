import styled from "styled-components";
import { useAllLectureQuery } from "../../hooks/lecture";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
const Wrapper = styled.div`
  width: 80%;
  min-height: 100vh;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  right: -20%;
`;
const EmptyLectureNotice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 50%;
  span {
    color: ${(props) => props.theme.textColor};
    font-size: 1.3vw;
    font-weight: 600;
  }
  button {
    &:hover {
      cursor: pointer;
      background-color: ${(props) => props.theme.errorColor};
      color: ${(props) => props.theme.textColor};
    }
    margin-top: 2vw;
    font-size: 1.2vw;
    background-color: transparent;
    border: none;
    padding: 1vw 3vw;
    color: ${(props) => props.theme.errorColor};
    background-color: ${(props) => props.theme.textColor};
    border-radius: 20px;
    transition: all 0.1s ease-in-out;
  }
`;
const AllLectureList = styled.div`
  width: 90%;
  height: 80%;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`;
const LectureItem = styled.article`
  &:hover {
    cursor: pointer;
    scale: 1.01;
  }
  height: 50vh;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  span {
    display: flex;
    width: 80%;
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
    padding: 1vw 3vw;
    position: absolute;
    border-radius: 20px;
    bottom: -2vw;
    left: 50%;
    transform: translateX(-50%);
  }
`;
const CreateLectureBox = styled.div`
  height: 50vh;
  border: 1px dotted ${(props) => props.theme.successColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  span {
    margin-bottom: 1vw;
    font-size: 1.3vw;
    font-weight: 600;
    color: ${(props) => props.theme.successColor};
  }
  svg {
    width: 3vw;
    height: 3vw;
    color: ${(props) => props.theme.successColor};
  }
  &:hover {
    cursor: pointer;
  }
`;
export default function UploadLecture() {
  const { lecture, allLectureIsLoading } = useAllLectureQuery(); // useAllLecture에서 {lectue : Array(n)} return
  const navigator = useNavigate();
  return allLectureIsLoading ? null : (
    <Wrapper>
      {lecture?.length ? (
        <AllLectureList>
          {lecture.map((item) => {
            return (
              <LectureItem onClick={() => navigator(item._id)}>
                <img src={item.thumbnail} alt="maked lecture item" />
                <span>{item.name}</span>
              </LectureItem>
            );
          })}
          <CreateLectureBox
            onClick={() => navigator("/admin-panel/make-lecture")}
          >
            <span>새로운 강의 만들기</span>
            <AiOutlinePlusCircle />
          </CreateLectureBox>
        </AllLectureList>
      ) : (
        <EmptyLectureNotice>
          <span>현재 만든 강의가 없습니다</span>
          <button onClick={() => navigator("/admin-panel/make-lecture")}>
            강의 만들기
          </button>
        </EmptyLectureNotice>
      )}
    </Wrapper>
  );
}
