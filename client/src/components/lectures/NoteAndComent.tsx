import styled from "styled-components";
import { BsFillReplyFill } from "react-icons/bs";
import { useState } from "react";
import { useLocation } from "react-router";
import {
  useCommentReplyMutation,
  useSubLectureCommentQuery,
} from "../../hooks/lecture";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { studentLoginState } from "../../atom/atoms";
const Wrapper = styled.div`
  width: 100%;
  min-height: 20vh;
  height: auto;
  padding: 1vw;
`;
const NoteContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  margin-bottom: 1vw;
`;
const NoteProfileImageContainer = styled.div`
  width: 6vw;
  height: 100%;
`;
const NoteProfileSubContainer = styled.div`
  width: 5vw;
  height: 5vw;
  border-radius: 100%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
`;
const NoteContentContainer = styled.div`
  width: 80%;
  margin-top: 1vw;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: #2f3542;
  border-radius: 20px;
  min-height: 20vh;
  padding: 1vw;
`;
const NoteProfileInfo = styled.div`
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1vw;
  span {
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
    font-size: 1.3vw;
  }
  small {
    color: ${(props) => props.theme.textColor};
    opacity: 0.8;
  }
`;
const NoteContent = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 1vw;
  p {
    padding: 1vw;
    font-size: 1.2vw;
    color: ${(props) => props.theme.textColor};
    line-height: 1.5;
    white-space: pre-wrap;
  }
`;
const ReplyBtn = styled.span`
  position: absolute;
  bottom: -1vw;
  right: 0vw;
  color: ${(props) => props.theme.successColor};
  transition: all 0.1s ease-in-out;
  display: flex;
  align-items: center;

  &:hover {
    filter: brightness(1.2);
    cursor: pointer;
  }
`;
const ReplyContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 1vw;
  padding-top: 2vw;
  display: flex;
`;
const ReplyProfileContainer = styled.div`
  width: 5vw;
  height: 5vw;
  position: relative;
  top: -1vw;
  border-radius: 100%;
  object-fit: cover;
  margin-right: 1vw;
  img {
    border-radius: 100%;
    width: 100%;
    height: 100%;
  }
`;
interface ContentBackgroundProps {
  authorType: string;
}
const ReplyContentBox = styled.div<ContentBackgroundProps>`
  width: calc(100% - 6vw);
  display: flex;
  flex-direction: column;
  padding: 1vw;
  background-color: ${(props) =>
    props.authorType === "student" ? "#385170" : "rgba(255, 165, 2, 0.5)"};
  border-radius: 10px;
`;
const ReplyInfoContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1vw;
  align-items: center;
  span {
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
    font-size: 1.3vw;
    svg {
      margin-right: 0.5vw;
    }
    small {
      color: ${(props) => props.theme.errorColor};
      font-size: 1vw;
      margin-left: 1vw;
      opacity: 1;
    }
  }
  small {
    color: ${(props) => props.theme.textColor};
    opacity: 0.8;
  }
`;
const ReplyContent = styled.div`
  width: 100%;
  padding: 1vw;
  p {
    color: ${(props) => props.theme.textColor};
    font-size: 1.2vw;
    line-height: 1.5;
    white-space: pre-wrap;
  }
`;
const ReplyForm = styled.form`
  width: 100%;
  height: auto;
  padding: 1vw;
  padding-top: 2vw;
  display: flex;
`;
const ReplyFormProfileContainer = styled.div`
  width: 5vw;
  height: 5vw;
  position: relative;
  top: -1vw;
  border-radius: 100%;
  object-fit: cover;
  margin-right: 1vw;
  img {
    border-radius: 100%;
    width: 100%;
    height: 100%;
  }
`;
const ReplyFormBox = styled.div`
  width: calc(100% - 6vw);
  display: flex;
  flex-direction: column;
  padding: 1vw;
  border-radius: 10px;
`;
const ReplyContentLabel = styled.label`
  width: 100%;
  padding: 1vw;
  textarea {
    width: 100%;
    height: 20vh;
    border: 1px solid ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.textColor};
    background-color: transparent;
    font-size: 1.2vw;
    padding: 1vw;
    border-radius: 10px;
    &:focus {
      outline: none;
    }
  }
`;
const ReplySubmitLabel = styled.label`
  width: 100%;
  padding: 0 1vw;
  display: flex;
  justify-content: flex-end;
  span {
    display: flex;
    width: 40%;
    align-items: center;
    justify-content: center;
    padding: 1vw;
    border-radius: 10px;
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
const NoComment = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: ${(props) => props.theme.textColor};
    opacity: 0.8;
  }
`;
interface DProps {
  content: string;
  extraError?: string;
}
export default function NoteAndComent() {
  const subLectureId = useLocation().pathname.split("/")[3];
  const [writeReply, setWriteReply] = useState<null | string>(null);
  const lectureCommentData = useSubLectureCommentQuery(subLectureId);
  const loginState = useRecoilValue(studentLoginState);
  const { register, setValue, formState, handleSubmit } = useForm<DProps>();
  const queryClient = useQueryClient();
  const replyMutate = useCommentReplyMutation({
    setValue,
    subLectureId,
    queryClient,
  });
  const handleWriteReplyClick = (commentId: string) => {
    // 일단은 아무 string으로 set
    if (writeReply === commentId) {
      setWriteReply(null);
      return;
    }
    setWriteReply(commentId);
  };
  const onValid = (data: DProps) => {
    if (!writeReply) {
      return;
    }
    replyMutate({ content: data.content, commentId: writeReply });
  };
  console.log("lectureCommentData");
  console.log(lectureCommentData);
  return (
    <Wrapper>
      {lectureCommentData?.comment?.length ? (
        lectureCommentData.comment.map((comment) => {
          return (
            <NoteContainer key={comment._id}>
              <NoteProfileImageContainer>
                <NoteProfileSubContainer>
                  <img
                    src={comment.ownerProfileUrl}
                    alt="student comment profile image"
                  />
                </NoteProfileSubContainer>
              </NoteProfileImageContainer>
              <NoteContentContainer>
                <NoteProfileInfo>
                  <span>{comment.ownerNickname}</span>
                  <small>{comment.createAt}</small>
                </NoteProfileInfo>
                <NoteContent>
                  <p>{comment.content}</p>
                  <ReplyBtn onClick={() => handleWriteReplyClick(comment._id)}>
                    <BsFillReplyFill />
                    댓글달기
                  </ReplyBtn>
                </NoteContent>
                {/* reply가 들어간다 */}
                {writeReply === comment._id ? (
                  <ReplyForm onSubmit={handleSubmit(onValid)}>
                    <ReplyFormProfileContainer>
                      <img
                        src={loginState.profileImg}
                        alt="reply user profile image"
                      />
                    </ReplyFormProfileContainer>
                    <ReplyFormBox>
                      <ReplyInfoContainer>
                        <span>
                          <BsFillReplyFill />
                          {loginState.nickname}
                          {formState.errors.content ? (
                            <small>{formState.errors.content.message}</small>
                          ) : null}
                        </span>
                      </ReplyInfoContainer>
                      <ReplyContentLabel htmlFor="reply_content">
                        <textarea
                          {...register("content", {
                            required: "댓글 내용을 입력해주세요",
                          })}
                          id="reply_content"
                          placeholder="좋아요!"
                        />
                      </ReplyContentLabel>
                      <ReplySubmitLabel htmlFor="submit_reply">
                        <input id="submit_reply" type="submit" />
                        <span>댓글달기</span>
                      </ReplySubmitLabel>
                    </ReplyFormBox>
                  </ReplyForm>
                ) : null}
                {comment.reply
                  ? comment.reply.map((reply) => {
                      return (
                        <ReplyContainer>
                          <ReplyProfileContainer>
                            <img
                              src={reply.ownerProfileUrl}
                              alt="reply user profile image"
                            />
                          </ReplyProfileContainer>
                          <ReplyContentBox authorType={reply.authorType}>
                            <ReplyInfoContainer>
                              <span>
                                <BsFillReplyFill />
                                {reply.ownerNickname}
                              </span>
                              <small>{reply.createdAt}</small>
                            </ReplyInfoContainer>
                            <ReplyContent>
                              <p>{reply.content}</p>
                            </ReplyContent>
                          </ReplyContentBox>
                        </ReplyContainer>
                      );
                    })
                  : null}
                {/* <ReplyContainer>
                    <ReplyProfileContainer>
                      <img
                        src="https://cdn.mhnse.com/news/photo/202305/183305_183232_222.jpg"
                        alt="reply user profile image"
                      />
                    </ReplyProfileContainer>
                    <ReplyContentBox>
                      <ReplyInfoContainer>
                        <span>
                          <BsFillReplyFill />
                          같이코딩
                        </span>
                        <small>2023.07.23</small>
                      </ReplyInfoContainer>
                      <ReplyContent>
                        <p>
                          대법원에 대법관을 둔다. 다만, 법률이 정하는 바에
                          의하여 대법관이 아닌 법관을 둘 수 있다. 국회의원의
                          수는 법률로 정하되, 200인 이상으로 한다. 국무총리는
                          국무위원의 해임을 대통령에게 건의할 수 있다. 모든
                          국민은 근로의 의무를 진다. 국가는 근로의 의무의 내용과
                          조건을 민주주의원칙에 따라 법률로 정한다. 모든 국민은
                          신속한 재판을 받을 권리를 가진다. 형사피고인은 상당한
                          이유가 없는 한 지체없이 공개재판을 받을 권리를 가진다.
                          대법원에 대법관을 둔다. 다만, 법률이 정하는 바에
                          의하여 대법관이 아닌 법관을 둘 수 있다. 국회의원의
                          수는 법률로 정하되, 200인 이상으로 한다. 국무총리는
                          국무위원의 해임을 대통령에게 건의할 수 있다. 모든
                          국민은 근로의 의무를 진다. 국가는 근
                        </p>
                      </ReplyContent>
                    </ReplyContentBox>
                  </ReplyContainer>
                  <ReplyContainer>
                    <ReplyProfileContainer>
                      <img
                        src="https://cdn.mhnse.com/news/photo/202305/183305_183232_222.jpg"
                        alt="reply user profile image"
                      />
                    </ReplyProfileContainer>
                    <ReplyContentBox>
                      <ReplyInfoContainer>
                        <span>
                          <BsFillReplyFill />
                          같이코딩
                        </span>
                        <small>2023.07.23</small>
                      </ReplyInfoContainer>
                      <ReplyContent>
                        <p>
                          대법원에 대법관을 둔다. 다만, 법률이 정하는 바에
                          의하여 대법관이 아닌 법관을 둘 수 있다. 국회의원의
                          수는 법률로 정하되, 200인 이상으로 한다. 국무총리는
                          국무위원의 해임을 대통령에게 건의할 수 있다. 모든
                          국민은 근로의 의무를 진다. 국가는 근로의 의무의 내용과
                          조건을 민주주의원칙에 따라 법률로 정한다. 모든 국민은
                          신속한 재판을 받을 권리를 가진다. 형사피고인은 상당한
                          이유가 없는 한 지체없이 공개재판을 받을 권리를 가진다.
                          대법원에 대법관을 둔다. 다만, 법률이 정하는 바에
                          의하여 대법관이 아닌 법관을 둘 수 있다. 국회의원의
                          수는 법률로 정하되, 200인 이상으로 한다. 국무총리는
                          국무위원의 해임을 대통령에게 건의할 수 있다. 모든
                          국민은 근로의 의무를 진다. 국가는 근
                        </p>
                      </ReplyContent>
                    </ReplyContentBox>
                  </ReplyContainer> */}
              </NoteContentContainer>
            </NoteContainer>
          );
        })
      ) : (
        <NoComment>
          <span>
            아직 아무도 노트를 작성하지 않았네요 첫 코멘트를 달아주세요!
          </span>
        </NoComment>
      )}
    </Wrapper>
  );
}
