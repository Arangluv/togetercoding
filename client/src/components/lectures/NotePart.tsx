import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import { useRecoilValue } from "recoil";
import { studentLoginState } from "../../atom/atoms";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { usePostCommentMutation } from "../../hooks/lecture";
import { useQueryClient } from "@tanstack/react-query";
const Wrapper = styled.div`
  width: 100%;
  min-height: 30vh;
  height: auto;
  padding: 1vw;
  display: flex;
  flex-direction: column;
  /* background-color: white; */
`;
const AlertContainer = styled.div`
  width: 100%;
  min-height: 5vw;
  height: auto;
  #alert_box {
    position: relative;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    background-color: #385170;
    filter: brightness(1.2);
    width: 80%;
    height: 100%;
    padding: 1.5vw;
    svg {
      position: absolute;
      top: 50%;
      right: 1vw;
      width: 4vw;
      height: 4vw;
      color: #fff6dc;
      transform: translateY(-50%);
    }
  }
  margin-bottom: 1vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  span {
    color: #fff6dc;
    margin-bottom: 0.5vw;
    font-size: 1vw;
  }
  #last_alert {
    margin-bottom: 0;
  }
`;
const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  height: 5vw;
  margin-bottom: 1vw;
`;
const ProfileAvatarContainer = styled.div`
  width: 5vw;
  height: 5vw;
  border-radius: 100%;
  object-fit: cover;
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
  svg {
    width: 100%;
    height: 100%;
    color: white;
  }
`;
const NicknameContainer = styled.div`
  display: flex;
  height: auto;
  align-items: center;
  margin-right: 1vw;
  span {
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    margin-left: 1vw;
    small {
      margin-left: 1vw;
      color: ${(props) => props.theme.errorColor};
      font-size: 1vw;
    }
  }
`;
const NoteForm = styled.form`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;
const NoteLabel = styled.label`
  width: 100%;
  height: auto;
  textarea {
    width: 100%;
    height: 15vw;
    border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 10px;
    padding: 1vw;
    background-color: transparent;
    color: white;
    font-size: 1.2vw;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #fff6dc;
      opacity: 0.5;
    }
  }
`;
const SubmitContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-end;
  border-radius: 10px;
`;
const SubmitLabel = styled.label`
  width: 20%;
  height: 100%;
  margin-top: 1vw;
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
  input[type="submit"] {
    display: none;
  }
`;
interface DProps {
  content: string;
  extraError?: string;
}
export default function NotePart() {
  const student = useRecoilValue(studentLoginState);
  const [profilePreview, setProfilePreview] = useState("");
  const {
    register,
    formState,
    setError,
    clearErrors,
    handleSubmit,
    watch,
    setValue,
  } = useForm<DProps>();
  const location = useLocation();
  const subLectureId = location.pathname.split("/")[3];
  const urlName = location.pathname.split("/")[1];
  const queryClient = useQueryClient();
  const postCommentMutate = usePostCommentMutation({
    setValue,
    queryClient,
    subLectureId,
  });
  useEffect(() => {
    if (!student) {
      return;
    }
    setProfilePreview(student.profileImg);
  }, [student]);
  const onValid = (data: DProps) => {
    postCommentMutate({ content: data.content, subLectureId, urlName });
  };
  return (
    <Wrapper>
      <AlertContainer>
        <div id="alert_box">
          <span>
            해당 강의에 대한 댓글을 남기거나, 필기하고 싶은 부분을 적어주세요
          </span>
          <span>
            {"필기내용은 프로필 > 대쉬보드 > 필기노트 에서 확인 가능합니다"}
          </span>
          <span id="last_alert">
            문제가 발생했다면 '문제가 발생했어요'를 이용해주세요
          </span>
          <HiOutlineInformationCircle />
        </div>
      </AlertContainer>
      <ProfileContainer>
        <ProfileAvatarContainer>
          {profilePreview ? (
            <img src={profilePreview} alt="student profile image" />
          ) : (
            <FaUserCircle />
          )}
        </ProfileAvatarContainer>
        <NicknameContainer>
          <span>
            {student.nickname}{" "}
            {formState.errors ? (
              <small>{formState.errors.content?.message}</small>
            ) : null}
          </span>
        </NicknameContainer>
      </ProfileContainer>
      <NoteForm onSubmit={handleSubmit(onValid)}>
        <NoteLabel htmlFor="lecture_comment">
          <textarea
            {...register("content", {
              required: "코멘트를 작성해주세요",
            })}
            id="lecture_comment"
            placeholder="이런게 도움이 됐고 이건 기억하고 싶어요!"
          ></textarea>
        </NoteLabel>
        <SubmitContainer>
          <SubmitLabel>
            <input type="submit" />
            <span>코멘트하기</span>
          </SubmitLabel>
        </SubmitContainer>
      </NoteForm>
    </Wrapper>
  );
}
