import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import DOMpurify from "dompurify";
import { useRecoilValue } from "recoil";
import { studentLoginState } from "../../atom/atoms";
import { usePostIssueReplyMutation } from "../../hooks/lecture";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
const Wrapper = styled.div`
  width: 100%;
  min-height: 10vh;
  height: auto;
  background-color: #353b48;
  padding: 1vw;
`;
interface AdminProps {
  isAdmin: boolean;
}
const IssueContainer = styled.article<AdminProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 20vh;
  height: auto;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isAdmin ? "rgba(255, 165, 2, 0.5)" : "#616265"};
  margin-bottom: 1vw;
`;
const InfoBox = styled.div`
  position: relative;
  width: 100%;
  height: 3vw;
  display: flex;
  align-items: center;
  padding: 0 1vw;
  span {
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    margin-left: 0.5vw;
  }
`;
const InfoProfile = styled.div`
  width: 2vw;
  height: 2vw;
  border-radius: 100%;
  object-fit: cover;
  svg {
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.textColor};
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
`;
const IssueReply = styled.small`
  position: absolute;
  color: ${(props) => props.theme.successColor};
  font-weight: 600;
  right: 1vw;
  transition: all 0.1s ease-in-out;
  &:hover {
    cursor: pointer;
    filter: brightness(1.1);
  }
`;
const IssueContent = styled.div`
  white-space: pre-wrap;
  padding: 1vw 2vw;
  line-height: 1.6;
  font-size: 1.1vw;
  color: ${(props) => props.theme.textColor};
`;

const IssueImage = styled.div`
  width: 100%;
  height: 50vh;
  overflow-y: scroll;
  object-fit: cover;
  padding: 1vw;
  img {
    width: 100%;
    height: 100%;
  }
`;

const IssueReplyForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 20vh;
  height: auto;
  border-radius: 10px;
  background-color: rgba(255, 165, 2, 0.5);
  margin-bottom: 1vw;
`;
const IsuueLabel = styled.label`
  width: 100%;
  padding: 0 1vw;
  margin: 1vw 0;
  span {
    font-size: 1.2vw;
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
    small {
      font-size: 1vw;
      color: ${(props) => props.theme.errorColor};
      margin-left: 0.5vw;
    }
  }
`;
const QuillWrapper = styled.div`
  width: 100%;
  margin: 1vw 0;
  padding: 0 1vw;
`;
const SubmitLabel = styled.label`
  width: 100%;
  padding: 0 1vw;
  display: flex;
  flex-direction: column;
  margin-bottom: 1vw;
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
    background-color: #ed942c;
    color: white;
    transition: all 0.1s ease-in-out;
    &:hover {
      color: #ed942c;
      background-color: white;
      cursor: pointer;
    }
  }
`;
interface IProps {
  _id: string;
  ownerProfileUrl: null | string;
  ownerNickname: string;
  content: string;
  referenceImg: string | null;
  issueReply: IssueReplyProps[];
}
interface IssueReplyProps {
  _id: string;
  authorType: string;
  content: string;
  owner: string;
  ownerNickname: string;
  ownerProfileUrl: string | null;
}
interface DProps {
  extraError?: string;
}
export default function IssueItemContainer({
  _id,
  ownerProfileUrl,
  ownerNickname,
  content,
  referenceImg,
  issueReply,
}: IProps) {
  const queryClient = useQueryClient();
  const subLectureId = useLocation().pathname.split("/")[3];
  const stdLoginState = useRecoilValue(studentLoginState);
  const [isAdmin, setIsAdmin] = useState(false);
  const [value, setValue] = useState(""); // 빈 경우는 <p><br></p> 경우도 존재;
  const [replyState, setReplyState] = useState<null | string>(null);
  const postReplyMutate = usePostIssueReplyMutation({
    queryClient,
    subLectureId,
    setReplyState,
    setValue,
  });
  const { setError, clearErrors, handleSubmit, formState } = useForm<DProps>();
  const handleIssueReplyClick = (clickId: string) => {
    if (replyState === null) {
      setReplyState(clickId);
      return;
    }
    if (clickId === _id) {
      setReplyState(null);
      return;
    }
    setReplyState(null);
  };
  useEffect(() => {
    if (
      process.env.REACT_APP_ADMIN_EMAIL == stdLoginState.email &&
      process.env.REACT_APP_ADMIN_USERNAME === stdLoginState.username
    ) {
      setIsAdmin(true);
      return;
    }
    return;
  }, [stdLoginState]);
  const onValid = () => {
    if (value === "") {
      setError("extraError", { message: "답글내용을 입력해주세요" });
      return;
    }
    if (value === "<p><br></p>") {
      setError("extraError", { message: "답글내용을 입력해주세요" });
      return;
    }
    postReplyMutate({ content: value, issueId: _id });
  };
  return (
    <Wrapper>
      <IssueContainer isAdmin={false}>
        <InfoBox>
          <InfoProfile>
            {ownerProfileUrl ? (
              <img src={ownerProfileUrl} alt="issue writer profile image" />
            ) : (
              <FaUserCircle />
            )}
          </InfoProfile>
          <span>{ownerNickname}</span>
          {isAdmin ? (
            <IssueReply onClick={() => handleIssueReplyClick(_id)}>
              답글달기
            </IssueReply>
          ) : null}
        </InfoBox>
        <IssueContent
          dangerouslySetInnerHTML={{ __html: DOMpurify.sanitize(content) }}
        />
        {referenceImg ? (
          <IssueImage>
            <img src={referenceImg} alt="issue reference image " />
          </IssueImage>
        ) : null}
      </IssueContainer>

      {replyState ? (
        <IssueReplyForm onSubmit={handleSubmit(onValid)}>
          <InfoBox>
            <InfoProfile>
              <img
                src="https://www.asemhobby.co.kr/shopimages/ysacademy/003003000700.jpg?1678433700"
                alt="issue writer profile image"
              />
            </InfoProfile>
            <span>같이코딩</span>
          </InfoBox>
          <IsuueLabel>
            <span>
              답변 내용
              {formState.errors.extraError ? (
                <small>{formState.errors.extraError.message}</small>
              ) : null}
            </span>
          </IsuueLabel>
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
              value={value}
              onChange={setValue}
              onFocus={() => clearErrors("extraError")}
            />
          </QuillWrapper>
          <SubmitLabel htmlFor="issue_reply_submit">
            <input id="issue_reply_submit" type="submit" />
            <span>답변달기</span>
          </SubmitLabel>
        </IssueReplyForm>
      ) : null}
      {issueReply
        ? issueReply.map((issueReply) => {
            return (
              <IssueContainer
                key={issueReply._id}
                isAdmin={issueReply.authorType === "true"}
              >
                <InfoBox>
                  <InfoProfile>
                    {issueReply.ownerProfileUrl ? (
                      <img
                        src={issueReply.ownerProfileUrl}
                        alt="issue writer profile image"
                      />
                    ) : (
                      <FaUserCircle />
                    )}
                  </InfoProfile>
                  <span>{issueReply.ownerNickname}</span>
                </InfoBox>
                <IssueContent
                  dangerouslySetInnerHTML={{
                    __html: DOMpurify.sanitize(issueReply.content),
                  }}
                />
              </IssueContainer>
            );
          })
        : null}
    </Wrapper>
  );
}
