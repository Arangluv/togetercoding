import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { lectureNotification } from "../../atom/atoms";
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
`;
const TitleLabel = styled.label`
  width: 100%;
  min-height: 10vh;
  height: auto;
  display: flex;
  flex-direction: column;
  span {
    font-size: 1.2vw;
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
    margin-bottom: 0.5vw;
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
const ContentLabel = styled(TitleLabel)`
  margin-bottom: 2vw;
`;
const SubmitLabel = styled.label`
  margin-top: 5vw;
  width: 100%;
  input[type="submit"] {
    display: none;
  }
  span {
    font-size: 1.3vw;
    padding: 0.5vw 4vw;
    border-radius: 10px;
    background-color: #66ca64;
    color: ${(props) => props.theme.textColor};
  }
`;
export default function IssueWritePart() {
  const [value, setValue] = useState("");
  const [lectureNoti, setLectureNoti] = useRecoilState(lectureNotification);
  return (
    <Wrapper>
      <IssuForm>
        <TitleLabel htmlFor="title">
          <span>제목</span>
          <input id="title" type="text" />
        </TitleLabel>
        <ContentLabel>
          <span>내용</span>
          <ReactQuill
            theme="snow"
            modules={{
              toolbar: {
                container: [
                  ["bold", "italic", "underline", "strike"],
                  ["blockquote", "code-block"],
                  [{ header: 1 }, { header: 2 }],
                  [{ list: "bullet" }],
                  // [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  [{ color: [] }, { background: [] }],
                  [{ font: [] }],
                  [{ align: [] }],
                  ["clean"],
                  // ["image"],
                ],
              },
            }}
            formats={[
              "font",
              "size",
              "header",
              "color",
              "background",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
            ]}
            value={lectureNoti}
            onChange={setLectureNoti}
          />
        </ContentLabel>
        <SubmitLabel htmlFor="note_submit">
          <span>저장하기</span>
          <input id="note_submit" type="submit" />
        </SubmitLabel>
      </IssuForm>
    </Wrapper>
  );
}
