import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import MainThemeMake from "./MainThemeMake";
import SubThemeMake from "./SubThemeMake";
import {
  useMainLectureQuery,
  useMainThemeDeleteMutation,
} from "../../hooks/lecture";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { mainTheme, subTheme } from "../../atom/atoms";
import { AiFillDelete } from "react-icons/ai";
import { useQueryClient } from "@tanstack/react-query";
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
`;
const LectureList = styled.div`
  width: 25%;
  height: 100vh;
  overflow-y: scroll;
  border-right: 1px solid #bdc3c7;
  padding: 1vw;
`;
const MainThemeBox = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin-bottom: 1vw;
`;
const MainThemeTitle = styled.h2`
  background-color: #2c3e50;
  color: white;
  height: 5vh;
  display: flex;
  align-items: center;
  padding-left: 1vw;
  position: relative;
  small {
    &:hover {
      cursor: pointer;
    }
    position: absolute;
    right: 1vw;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    svg {
      width: 1.5vw;
      height: 1.5vw;
      color: ${(props) => props.theme.errorColor};
    }
  }
`;
const SubThemeBox = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 5vh;
  height: auto;
  white-space: pre-wrap;
  background-color: #34495e;
  color: ${(props) => props.theme.textColor};
  border-bottom: 1px solid #130f40;
  padding-left: 1vw;
  transition: all 0.1s ease-in-out;
  &:hover {
    filter: brightness(1.1);
  }
`;
const EmptyMainLecture = styled.span`
  display: block;
  margin-bottom: 1vw;
  text-align: center;
  color: ${(props) => props.theme.errorColor};
`;
const PlusThemeBox = styled(SubThemeBox)`
  justify-content: center;
  svg {
    width: 2vw;
    height: 2vw;
    color: ${(props) => props.theme.successColor};
  }
`;
const MakeNewChapter = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5vh;
  text-align: center;
  border: 1px solid ${(props) => props.theme.successColor};
  color: ${(props) => props.theme.successColor};
  border-radius: 10px;
  transition: all 0.1s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.successColor};
    color: ${(props) => props.theme.textColor};
  }
`;
interface LectureProps {
  subLectureId: string;
  mainLectureId: string;
}
export default function UploadDetailLecture() {
  const params = useParams();
  const { lectureId } = params;
  const queryClient = useQueryClient();
  const mainLecture = useMainLectureQuery(lectureId ? lectureId : "");
  const [themeState, setThemeState] = useState<"sub" | "main" | null>(null);
  const setSubTheme = useSetRecoilState(subTheme);
  const setMainTheme = useSetRecoilState(mainTheme);
  const mainThemeDeleteMutate = useMainThemeDeleteMutation({
    queryClient,
    lectureId: lectureId ? lectureId : "",
  });
  const handleNewMakeSubTheme = (mainThemeId: string) => {
    setThemeState("sub");
    setSubTheme("");
    setMainTheme(mainThemeId);
  };
  const handleModifySubTheme = ({
    subLectureId,
    mainLectureId,
  }: LectureProps) => {
    setThemeState("sub");
    setSubTheme(subLectureId);
    setMainTheme(mainLectureId);
  };
  const handleMainThemeDelete = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    const mainLectureId = event.currentTarget.dataset.mainLectureId;
    mainThemeDeleteMutate({
      lectureId: lectureId ? lectureId : "",
      mainLectureId: mainLectureId ? mainLectureId : "",
    });
    // 현재 큰 lectured의 id와 main lecture id를 보낸다
  };
  return (
    <Wrapper>
      <LectureList>
        {mainLecture?.lecture?.length ? (
          mainLecture.lecture.map((item) => {
            return (
              <MainThemeBox key={item._id}>
                <MainThemeTitle>
                  <span>{item.name}</span>
                  {item.subLecture.length ? null : (
                    <small
                      data-main-lecture-id={item._id}
                      onClick={handleMainThemeDelete}
                    >
                      <AiFillDelete />
                    </small>
                  )}
                </MainThemeTitle>
                {item.subLecture.length
                  ? item.subLecture.map((subLecture) => {
                      return (
                        <SubThemeBox
                          onClick={() =>
                            handleModifySubTheme({
                              subLectureId: subLecture._id,
                              mainLectureId: item._id,
                            })
                          }
                        >
                          {subLecture.name}
                        </SubThemeBox>
                      );
                    })
                  : null}
                <PlusThemeBox onClick={() => handleNewMakeSubTheme(item._id)}>
                  <AiOutlinePlusCircle />
                </PlusThemeBox>
              </MainThemeBox>
            );
          })
        ) : (
          <EmptyMainLecture>만든 챕터가 없습니다</EmptyMainLecture>
        )}

        <MakeNewChapter onClick={() => setThemeState("main")}>
          새로운 챕터 +
        </MakeNewChapter>
      </LectureList>
      {/* 대주제와 소주제를 만드는 항목이 달라야한다. 엄청 중요함 */}
      {themeState === "main" ? (
        <MainThemeMake lectureId={lectureId ? lectureId : ""} />
      ) : themeState === "sub" ? (
        <SubThemeMake />
      ) : null}
    </Wrapper>
  );
}
