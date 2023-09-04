import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { lectureNotification } from "../../atom/atoms";
import { BsFillImageFill } from "react-icons/bs";
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
  height: 30vh;
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
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
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
export default function IssueWritePart() {
  const [lectureNoti, setLectureNoti] = useRecoilState(lectureNotification);
  return (
    <Wrapper>
      <IssuForm>
        <TitleLabel htmlFor="title">
          <span>제목</span>
          <input id="title" type="text" placeholder="이슈 제목을 적어주세요" />
        </TitleLabel>
        <ContentLabel>
          <span>내용</span>
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
            value={lectureNoti}
            onChange={setLectureNoti}
          />
        </QuillWrapper>
        <ImageLabel>
          <input type="file" accept=".jpg .png .jpeg .gif" />
          <span>
            <BsFillImageFill />
            업로드 할 이미지가 있나요? (파일 형식 jpg, png, gif, jpeg)
          </span>
        </ImageLabel>
        <SubmitLabel htmlFor="note_submit">
          <span>저장하기</span>
          <input id="note_submit" type="submit" />
        </SubmitLabel>
      </IssuForm>
    </Wrapper>
  );
}
