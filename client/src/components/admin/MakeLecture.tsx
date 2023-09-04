import styled from "styled-components";
import { BsFillFileEarmarkImageFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useMakeLectureMutation } from "../../hooks/lecture";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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
  textarea {
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    width: 80%;
    min-height: 20vh;
    height: auto;
    border: 1px solid ${(props) => props.theme.textColor};
    background-color: transparent;
    padding: 0.8vw 0.5vw;
    border-radius: 10px;
    color: ${(props) => props.theme.textColor};
    font-size: 1.2vw;
  }
`;

const ThumbnailLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: auto;
  margin-bottom: 1vw;
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
    height: 30vh;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
const SubmitLabel = styled.label`
  height: auto;
  margin-top: 1vw;
  width: 80%;
  display: flex;
  justify-content: flex-end;
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
interface DProps {
  name: string;
  subName: string; //add
  urlName: string; //add
  description: string; //add
  lectureTag: string; //add
  thumbnail: FileList;
  extraError?: string;
}
export default function MakeLecture() {
  const queryClient = useQueryClient();
  const navigator = useNavigate();
  const { register, formState, handleSubmit, watch } = useForm<DProps>();
  const makeLectureMutate = useMakeLectureMutation({ queryClient, navigator });
  const [preview, setPreview] = useState("");
  const onValid = (data: DProps) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("subName", data.subName);
    formData.append("urlName", data.urlName);
    formData.append("description", data.description);
    formData.append("lectureTag", data.lectureTag);
    if (data.thumbnail.length !== 0) {
      formData.append("lecture-thumbnail", data.thumbnail[0]);
    }
    makeLectureMutate(formData);
  };
  useEffect(() => {
    if (watch("thumbnail").length === 0) {
      return;
    }
    const thumbnailPreview = URL.createObjectURL(watch("thumbnail")[0]);
    setPreview(thumbnailPreview);
    return () => URL.revokeObjectURL(preview);
  }, [watch("thumbnail")]);
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <NameLabel htmlFor="name">
          <span>
            강의 타이틀
            {formState.errors.name ? (
              <small>{formState.errors.name.message}</small>
            ) : null}
          </span>
          <input
            {...register("name", {
              required: "타이틀을 입력해주세요",
            })}
            id="name"
            type="text"
            placeholder="타이틀을 적어주세요"
          />
        </NameLabel>
        <NameLabel htmlFor="subName">
          <span>
            서브타이틀
            {formState.errors.subName ? (
              <small>{formState.errors.subName.message}</small>
            ) : null}
          </span>
          <input
            {...register("subName", {
              required: "서브타이틀을 입력해주세요",
            })}
            id="subName"
            type="text"
            placeholder="서브타이틀을 적어주세요"
          />
        </NameLabel>
        <NameLabel htmlFor="urlName">
          <span>
            강의 대표 URL 설정
            {formState.errors.name ? (
              <small>{formState.errors.name.message}</small>
            ) : null}
          </span>
          <input
            {...register("urlName", {
              required: "강의 URL 이름을 적어주세요",
            })}
            id="urlName"
            type="text"
            placeholder="/html-css-basic/lectures/:lectureId 에서 html-css 부분에 해당"
          />
        </NameLabel>
        <NameLabel htmlFor="description">
          <span>
            강의설명 추가하기
            {formState.errors.name ? (
              <small>{formState.errors.name.message}</small>
            ) : null}
          </span>
          <textarea
            {...register("description", {
              required: "강의 설명을 적어주세요",
            })}
            id="description"
            placeholder="강의 설명을 적어주세요"
          />
        </NameLabel>
        <NameLabel htmlFor="lectureTag">
          <span>
            강의 태그 추가하기
            {formState.errors.name ? (
              <small>{formState.errors.name.message}</small>
            ) : null}
          </span>
          <input
            {...register("lectureTag", {
              required: "태그를 하나이상 입력해주세요",
            })}
            id="lectureTag"
            type="text"
            placeholder="강의 태그를 설정해주세요 (쉼표로 구분)"
          />
        </NameLabel>
        <ThumbnailLabel htmlFor="thumbnail">
          <span>
            썸네일
            {formState.errors.thumbnail ? (
              <small>{formState.errors.thumbnail.message}</small>
            ) : null}
          </span>
          <div id="thumbnail-preview">
            {preview === "" ? (
              <BsFillFileEarmarkImageFill />
            ) : (
              <img src={preview} alt="lecture thumbnail preview" />
            )}
          </div>
          <input
            {...register("thumbnail", {
              required: "썸네일은 필수입니다",
            })}
            id="thumbnail"
            type="file"
            accept="image/*"
          />
        </ThumbnailLabel>
        {formState.errors.extraError ? (
          <ExtraErrorSpan>{formState.errors.extraError.message}</ExtraErrorSpan>
        ) : null}
        <SubmitLabel>
          <span>만들기</span>
          <input type="submit" />
        </SubmitLabel>
      </Form>
    </Wrapper>
  );
}
