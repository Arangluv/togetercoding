import styled from "styled-components";
import { AiFillVideoCamera } from "react-icons/ai";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useRecoilState, useRecoilValue } from "recoil";
import { mainTheme, subTheme, uploadProgressState } from "../../atom/atoms";
import { useForm } from "react-hook-form";
import {
  useSubLectureQuery,
  useSubLectureRemoveMutation,
  useSubThemeMutation,
} from "../../hooks/lecture";
import UploadProgress from "../UploadProgress";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
// import "react-quill/dist/quill.snow.css";
const Wrapper = styled.div`
  width: 75%;
  height: 100vh;
  overflow-y: scroll;
`;
const Form = styled.form`
  width: 90%;
  min-height: 60%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 2vw;
`;
const NameLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin-bottom: 2vw;
  span {
    color: ${(props) => props.theme.textColor};
    font-size: 1.3vw;
    font-weight: 600;
    margin-bottom: 1vw;
    small {
      color: ${(props) => props.theme.errorColor};
      font-size: 1.1vw;
      margin-left: 1vw;
    }
  }
  input[type="text"] {
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    width: 80%;
    border: 1px solid ${(props) => props.theme.textColor};
    background-color: transparent;
    padding: 0.8vw 0.5vw;
    border-radius: 10px;
    color: ${(props) => props.theme.textColor};
    font-size: 1.2vw;
  }
`;
const GithubLabel = styled(NameLabel)``;

const VideoLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: auto;
  margin-bottom: 2vw;
  span {
    color: ${(props) => props.theme.textColor};
    font-size: 1.3vw;
    font-weight: 600;
    margin-bottom: 1vw;
    small {
      color: ${(props) => props.theme.errorColor};
      font-size: 1.1vw;
      margin-left: 1vw;
    }
  }
  #thumbnail-preview {
    &:hover {
      cursor: pointer;
    }
    width: 100%;
    height: 50vh;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    video {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 10px;
    }
    svg {
      color: ${(props) => props.theme.textColor};
      width: 5vw;
      height: 5vw;
    }
  }
  input[type="file"] {
    display: none;
  }
`;
const ExtraErrorSpan = styled.span`
  display: flex;
  width: 80%;
  justify-content: center;
  color: ${(props) => props.theme.errorColor};
  font-size: 1.1vw;
`;
const ActionContainer = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1vw;
`;
const SubmitLabel = styled.label`
  height: auto;
  width: 50%;
  display: flex;
  input[type="submit"] {
    display: none;
  }
  span {
    color: ${(props) => props.theme.textColor};
    font-size: 1.3vw;
    font-weight: 600;
    padding: 1vw 6vw;
    border-radius: 10px;
    background-color: ${(props) => props.theme.successColor};
    transition: all 0.1s ease-in-out;
    &:hover {
      cursor: pointer;
      color: ${(props) => props.theme.successColor};
      background-color: ${(props) => props.theme.textColor};
    }
  }
`;
const DeleteSpan = styled.span`
  border: none;
  background-color: ${(props) => props.theme.errorColor};
  color: white;
  font-size: 1.3vw;
  font-weight: 600;
  padding: 1vw 6vw;
  border-radius: 10px;
  transition: all 0.1s ease-in-out;
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.errorColor};
    background-color: ${(props) => props.theme.textColor};
  }
`;
const NoticeLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: auto;
  margin-bottom: 1vw;
  span {
    color: ${(props) => props.theme.textColor};
    font-size: 1.3vw;
    font-weight: 600;
    small {
      color: ${(props) => props.theme.errorColor};
      font-size: 1.1vw;
      margin-left: 1vw;
    }
  }
`;
const QuillWrapper = styled.div`
  width: 80%;
  margin-bottom: 2vw;
`;
const toolbarOptions = [
  ["link", "image", "video"],
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
];

// 옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼수 없음
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "background",
  "color",
  "link",
  "image",
  "video",
  "width",
];

const modules = {
  toolbar: {
    container: toolbarOptions,
  },
};
interface DProps {
  subLectureName: string;
  lectureVideo?: FileList;
  lectureLink?: string;
  github?: string;
  extraError?: string;
}
export default function SubThemeMake() {
  const queryClient = useQueryClient();
  const params = useParams();
  const { lectureId } = params;
  // SubTheme form state management
  const [preview, setPreview] = useState("");
  const [value, setValue] = useState("");
  // *** subTheme이 null 혹은 ""이면 새로운 서브 Chapter를 만든다. (useQuery의 eabled 활용) ***
  const subThemeState = useRecoilValue(subTheme);
  const mainThemeState = useRecoilValue(mainTheme);
  const {
    register,
    handleSubmit,
    formState,
    clearErrors,
    setError,
    watch,
    setValue: setSublectureValue,
  } = useForm<DProps>();
  const { subThemeMutate, subThemeIsLoading } = useSubThemeMutation({
    queryClient,
    lectureId: lectureId ? lectureId : "",
    subThemeId: subThemeState ? subThemeState : "",
  });
  const subLectures = useSubLectureQuery(subThemeState ? subThemeState : "");
  const removeSublectureMutate = useSubLectureRemoveMutation({
    queryClient,
    lectureId: lectureId ? lectureId : "",
    subThemeId: subThemeState ? subThemeState : "",
  });
  useEffect(() => {
    if (!subLectures) {
      return;
    }
    setSublectureValue(
      "github",
      subLectures.githubUrl ? subLectures.githubUrl : ""
    );
    setSublectureValue("subLectureName", subLectures.name);
    // setSublectureValue("lectureVideo", subLectures.lectureLink);
    setSublectureValue("lectureLink", subLectures?.lectureLink);
    setPreview(subLectures.lectureLink);
    setValue(subLectures.notice ? subLectures.notice : "");
  }, [subLectures]);
  useEffect(() => {
    if (subThemeState === "") {
      setSublectureValue("github", "");
      setSublectureValue("subLectureName", "");
      // setSublectureValue("lectureVideo", subLectures.lectureLink);

      setPreview("");
      setValue("");
    }
  }, [subThemeState]);
  // upload Progress value
  const [progressValue, setProgressValue] = useRecoilState(uploadProgressState);
  const onValid = (data: DProps) => {
    const formData = new FormData();
    formData.append("subLectureName", data.subLectureName);
    if (data.github) {
      formData.append("githubUrl", data.github);
    }
    if (value) {
      formData.append("notice", value);
    }
    formData.append("subLectureId", subThemeState ? subThemeState : "");
    formData.append("mainLectureId", mainThemeState ? mainThemeState : "");
    formData.append("lectureId", lectureId ? lectureId : "");
    if (data.lectureVideo) {
      formData.append("lectureVideo", data.lectureVideo[0]);
    } else {
    }
    if (data?.lectureLink) {
      formData.append("lectureLink", data.lectureLink);
    }
    subThemeMutate({ data: formData, setProgressValue });
  };
  useEffect(() => {
    const lectureVideo = watch("lectureVideo");
    if (lectureVideo === undefined) {
      return;
    }
    if (!lectureVideo[0]) {
      return;
    }
    const videoUrl = URL.createObjectURL(lectureVideo[0]);
    setPreview(videoUrl);

    return () => URL.revokeObjectURL(videoUrl);
  }, [watch("lectureVideo")]);
  return subThemeIsLoading ? (
    <UploadProgress progressValue={progressValue} />
  ) : (
    <Wrapper>
      <Form encType="multipart/form-data" onSubmit={handleSubmit(onValid)}>
        <NameLabel htmlFor="lecture-name">
          <span>
            서브주제 이름
            {formState.errors.subLectureName ? (
              <small>{formState.errors.subLectureName.message}</small>
            ) : null}
          </span>
          <input
            {...register("subLectureName", {
              required: "강의이름을 적어주세요",
            })}
            id="lecture-name"
            type="text"
          />
        </NameLabel>
        <GithubLabel htmlFor="github">
          <span>Github 주소</span>
          <input {...register("github")} id="github" type="text" />
        </GithubLabel>
        <VideoLabel htmlFor="lecture-video">
          <span>
            비디오 업로드{" "}
            {formState.errors.lectureVideo ? (
              <small>{formState.errors.lectureVideo.message}</small>
            ) : null}
          </span>
          <div id="thumbnail-preview">
            {preview === "" ? (
              <AiFillVideoCamera />
            ) : (
              <ReactPlayer
                url={preview}
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
            )}
          </div>
          <input
            {...register("lectureVideo")}
            id="lecture-video"
            type="file"
            accept="video/mp4,video/mkv, video/x-m4v,video/*"
          />
        </VideoLabel>
        <NoticeLabel>
          <span>참고 사항</span>
        </NoticeLabel>
        <QuillWrapper>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={value}
            onChange={setValue}
          />
        </QuillWrapper>
        {formState.errors.extraError ? (
          <ExtraErrorSpan>{formState.errors.extraError.message}</ExtraErrorSpan>
        ) : null}
        <ActionContainer>
          <SubmitLabel htmlFor="subTheme_submit">
            <span>제출하기</span>
            <input id="subTheme_submit" type="submit" />
          </SubmitLabel>
          <DeleteSpan
            onClick={() =>
              removeSublectureMutate({
                subLectureId: subThemeState ? subThemeState : "",
                mainLectureId: mainThemeState ? mainThemeState : "",
                lectureId: lectureId ? lectureId : "",
              })
            }
          >
            삭제하기
          </DeleteSpan>
        </ActionContainer>
      </Form>
    </Wrapper>
  );
}
