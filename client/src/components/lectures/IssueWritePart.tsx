import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { lectureNotification } from "../../atom/atoms";
import { BsFillImageFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { usePostIssueMuation } from "../../hooks/lecture";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
const Wrapper = styled.div`
  width: 100%;
  min-height: 30vh;
  height: auto;
  margin-top: 1vw;
  padding: 1vw;
  display: flex;
  flex-direction: column;
  /* background-color: white; */
`;
const IssuForm = styled.form`
  width: 100%;
  height: auto;
  padding: 3vw;
  border: 1px solid ${(props) => props.theme.textColor};
  border-radius: 10px;
`;
const TitleLabel = styled.label`
  width: 100%;
  min-height: 10vh;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 1vw;
  span {
    font-size: 1.2vw;
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
    margin-bottom: 1vw;
    small {
      margin-left: 0.5vw;
      color: ${(props) => props.theme.errorColor};
      font-size: 1vw;
    }
  }
  input[type="text"] {
    width: 60%;
    font-size: 1.1vw;
    padding: 0.5vw 1vw;
    border-radius: 5px;
    background-color: transparent;
    border: 1px solid #eaecec;
    color: ${(props) => props.theme.textColor};
    &:focus {
      outline: none;
    }
  }
`;
const ContentLabel = styled.label`
  span {
    font-size: 1.2vw;
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
    margin-bottom: 0.5vw;
    small {
      margin-left: 0.5vw;
      color: ${(props) => props.theme.errorColor};
      font-size: 1vw;
    }
  }
`;
const QuillWrapper = styled.div`
  width: 100%;
  margin: 1vw 0;
`;
const ImageLabel = styled.label`
  display: flex;
  margin-bottom: 1vw;
  flex-direction: column;
  width: 100%;
  min-height: 30vh;
  input[type="file"] {
    display: none;
  }
  svg {
    width: 3vw;
    height: 3vw;
    margin-bottom: 1vw;
  }
  span {
    border: 1px dotted ${(props) => props.theme.textColor};
    border-radius: 10px;
    color: ${(props) => props.theme.textColor};
    width: 100%;
    height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
  }
`;
const UploadImageContainer = styled.div`
  width: 100%;
  height: 50vh;
  border: 1px dotted ${(props) => props.theme.textColor};
  border-radius: 10px;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const SubmitLabel = styled.label`
  margin-top: 3vw;
  width: 100%;
  input[type="submit"] {
    display: none;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1vw;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.successColor};
    color: white;
    transition: all 0.1s ease-in-out;
    &:hover {
      color: ${(props) => props.theme.successColor};
      background-color: white;
      cursor: pointer;
    }
  }
`;
interface DProps {
  title: string;
  content: string;
  referenceImage: FileList;
}
export default function IssueWritePart() {
  const subLectureId = useLocation().pathname.split("/")[3];
  const urlName = useLocation().pathname.split("/")[1];
  const queryClient = useQueryClient();
  const [issueContent, setIssueContent] = useState("");
  const [preview, setPreview] = useState("");
  const {
    register,
    formState,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<DProps>();
  const postIssueMutate = usePostIssueMuation({
    queryClient,
    subLectureId,
    preview,
    setIssueContent,
    setValue,
    setPreview,
  });
  const handleContentChange = (event: string) => {
    setValue("content", event);
    setIssueContent(event);
  };
  useEffect(() => {
    if (watch("referenceImage").length === 0) {
      return;
    }
    const uploadImagePreview = URL.createObjectURL(watch("referenceImage")[0]);
    setPreview(uploadImagePreview);

    return () => URL.revokeObjectURL(uploadImagePreview);
  }, [watch("referenceImage")]);
  const onValid = (data: DProps) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("subLectureId", subLectureId);
    formData.append("urlName", urlName);
    if (issueContent === "" || issueContent === "<p><br/></p>") {
      setError("content", { message: "이슈 내용을 적어주세요" });
      return;
    }

    if (data.referenceImage[0]) {
      formData.append("referenceImage", data.referenceImage[0]);
    }
    postIssueMutate(formData);
  };
  return (
    <Wrapper>
      <IssuForm onSubmit={handleSubmit(onValid)}>
        <TitleLabel htmlFor="title">
          <span>
            제목
            {formState.errors.title ? (
              <small>{formState.errors.title.message}</small>
            ) : null}
          </span>
          <input
            {...register("title", {
              required: "이슈 제목을 입력주세요",
              minLength: {
                value: 3,
                message: "최소 3글자 이상으로 적어주세요",
              },
            })}
            id="title"
            type="text"
            placeholder="이슈 제목을 적어주세요"
          />
        </TitleLabel>
        <ContentLabel>
          <span>
            내용
            {formState.errors.content ? (
              <small>{formState.errors.content.message}</small>
            ) : null}
          </span>
        </ContentLabel>
        <QuillWrapper>
          <ReactQuill
            theme="snow"
            placeholder={`ex) Warning: Each child in a list should have a unique "key" prop는 왜 발생하나요?
-> 문제가 발생한 부분이나, 궁금한 부분의 코드를 첨부해주세요
-> 캡쳐해서 설명하는게 빠르다면, 사진을 업로드해주세요
-> 문제를 자세하게 설명 할 수록 빠르게 해결가능해요`}
            modules={{
              toolbar: {
                container: [[{ color: [] }, { background: [] }]],
              },
            }}
            formats={[
              "color",
              "background",
              "bold",
              "italic",
              "underline",
              "strike",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
            ]}
            value={issueContent}
            onChange={(event) => handleContentChange(event)}
            onFocus={() => clearErrors("content")}
          />
        </QuillWrapper>
        <ImageLabel htmlFor="issue_image">
          <input
            {...register("referenceImage")}
            id="issue_image"
            type="file"
            accept="image/*"
          />
          {preview ? (
            <UploadImageContainer>
              <img src={preview} alt="issue reference image preview" />
            </UploadImageContainer>
          ) : (
            <span>
              <BsFillImageFill />
              업로드 할 이미지가 있나요?
            </span>
          )}
        </ImageLabel>
        <SubmitLabel htmlFor="note_submit">
          <span>저장하기</span>
          <input id="note_submit" type="submit" />
        </SubmitLabel>
      </IssuForm>
    </Wrapper>
  );
}
