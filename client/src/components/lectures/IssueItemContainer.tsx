import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import ReactQuill from "react-quill";
import { useState } from "react";
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
const IssueContent = styled.p`
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
export default function IssueItemContainer() {
  const [value, setValue] = useState("");
  const [replyState, setReplyState] = useState<null | string>(null);
  const handleIssueReplyClick = () => {
    if (replyState === null) {
      setReplyState("asd");
      return;
    }
    setReplyState(null);
  };
  return (
    <Wrapper>
      <IssueContainer isAdmin={false}>
        <InfoBox>
          <InfoProfile>
            {false ? (
              <img
                src="https://www.asemhobby.co.kr/shopimages/ysacademy/003003000700.jpg?1678433700"
                alt="issue writer profile image"
              />
            ) : (
              <FaUserCircle />
            )}
          </InfoProfile>
          <span>gkgkgk2</span>
          <IssueReply onClick={() => handleIssueReplyClick()}>
            답글달기
          </IssueReply>
        </InfoBox>
        <IssueContent>
          농업생산성의 제고와 농지의 합리적인 이용을 위하거나 불가피한 사정으로
          발생하는 농지의 임대차와 위탁경영은 법률이 정하는 바에 의하여
          인정된다. 모든 국민은 인간다운 생활을 할 권리를 가진다. 군인은 현역을
          면한 후가 아니면 국무위원으로 임명될 수 없다. 혼인과 가족생활은 개인의
          존엄과 양성의 평등을 기초로 성립되고 유지되어야 하며, 국가는 이를
          보장한다.보장한다.보장한다.보장한다.보장한다.보장한다.보장한다.보장한다.보장한다.보장한다.보장한다.보장한
        </IssueContent>
        <IssueImage>
          <img
            src="https://dojang.io/pluginfile.php/17539/mod_forum/post/3439/my%20code.JPG"
            alt="issue reference image "
          />
        </IssueImage>
      </IssueContainer>

      {replyState ? (
        <IssueReplyForm>
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
            <span>답변 내용</span>
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
            />
          </QuillWrapper>
          <SubmitLabel htmlFor="issue_reply_submit">
            <input id="issue_reply_submit" type="submit" />
            <span>답변달기</span>
          </SubmitLabel>
        </IssueReplyForm>
      ) : null}
      <IssueContainer isAdmin={true}>
        <InfoBox>
          <InfoProfile>
            {true ? (
              <img
                src="https://www.asemhobby.co.kr/shopimages/ysacademy/003003000700.jpg?1678433700"
                alt="issue writer profile image"
              />
            ) : (
              <FaUserCircle />
            )}
          </InfoProfile>
          <span>같이 코딩</span>
        </InfoBox>
        <IssueContent>
          농업생산성의 제고와 농지의 합리적인 이용을 위하거나 불가피한 사정으로
          발생하는 농지의 임대차와 위탁경영은 법률이 정하는 바에 의하여
          인정된다. 모든 국민은 인간다운 생활을 할 권리를 가진다. 군인은 현역을
          면한 후가 아니면 국무위원으로 임명될 수 없다. 혼인과 가족생활은 개인의
          존엄과 양성의 평등을 기초로 성립되고 유지되어야 하며, 국가는 이를
          보장한다.보장한다.보장한다.보장한다.보장한다.보장한다.보장한다.보장한다.보장한다.보장한다.보장한다.보장한
        </IssueContent>
      </IssueContainer>
    </Wrapper>
  );
}
