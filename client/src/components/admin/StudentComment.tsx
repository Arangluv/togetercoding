import { useState } from "react";
import styled from "styled-components";
import { useGetAllStudentCommentQuery } from "../../hooks/lecture";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 80%;
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  position: relative;
  right: -20%;
  padding: 3vw;
`;
const CommentTable = styled.table`
  width: 100%;
  height: auto;
  max-height: 100vh;
  overflow: scroll;
  margin-top: 1vw;
  thead {
    border-bottom: 1px solid ${(props) => props.theme.insideBgColor};
  }
  th {
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    font-size: 1.3vw;
    padding: 1vw;
    background-color: #233142;
  }
  td {
    text-align: center;
    padding: 1vw;
    color: ${(props) => props.theme.textColor};
    background-color: #222831;
    border-bottom: 1px solid ${(props) => props.theme.insideBgColor};
  }
  td:nth-child(3) {
    max-width: 500px;
    max-height: 10vh;
    overflow: scroll;
  }
  td:last-child {
    transition: color 0.1s ease-in-out;
    &:hover {
      cursor: pointer;
      color: ${(props) => props.theme.successColor};
    }
  }
`;

const GetOptionContainer = styled.div`
  width: 100%;
  height: 5vw;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  button {
    margin: 0 0.7vw;
    background-color: ${(props) => props.theme.textColor};
    border-radius: 5px;
    padding: 0.7vw 1.2vw;
    border: none;
    /* background-color: #4FBFE9; */
    &:hover {
      cursor: pointer;
    }
  }
`;
export default function StudentComment() {
  const [getCommentState, setGetCommentState] = useState<
    "all" | "week" | "month"
  >("all");
  const allStudentComment = useGetAllStudentCommentQuery(getCommentState);
  console.log(allStudentComment);
  const navigator = useNavigate();
  return (
    <Wrapper>
      <GetOptionContainer>
        <button
          onClick={() => setGetCommentState("all")}
          style={{
            backgroundColor: getCommentState === "all" ? "#4FBFE9" : "white",
          }}
        >
          전체
        </button>
        <button
          onClick={() => setGetCommentState("week")}
          style={{
            backgroundColor: getCommentState === "week" ? "#4FBFE9" : "white",
          }}
        >
          일주일전
        </button>
        <button
          onClick={() => setGetCommentState("month")}
          style={{
            backgroundColor: getCommentState === "month" ? "#4FBFE9" : "white",
          }}
        >
          한달전
        </button>
      </GetOptionContainer>
      <CommentTable>
        <thead>
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>내용</th>
            <th>강의바로가기</th>
          </tr>
        </thead>
        <tbody>
          {allStudentComment?.length
            ? allStudentComment.map((comment, idx) => {
                return (
                  <tr key={comment._id}>
                    <td>{idx + 1}</td>
                    <td>{comment.ownerNickname}</td>
                    <td>{comment.content}</td>
                    <td onClick={() => navigator(`/${comment.urlName}`)}>
                      바로가기
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </CommentTable>
    </Wrapper>
  );
}
