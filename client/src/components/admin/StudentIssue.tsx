import styled from "styled-components";
import { useGetAllStudentIssueQuery } from "../../hooks/lecture";
import { useState } from "react";
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

export default function StudentIssue() {
  const [getIssueState, setGetIssueState] = useState<"all" | "week" | "month">(
    "all"
  );
  const allIssueData = useGetAllStudentIssueQuery(getIssueState);
  const navigator = useNavigate();
  console.log("allIssueData");
  console.log(allIssueData);
  return (
    <Wrapper>
      <GetOptionContainer>
        <button
          onClick={() => setGetIssueState("all")}
          style={{
            backgroundColor: getIssueState === "all" ? "#4FBFE9" : "white",
          }}
        >
          전체
        </button>
        <button
          onClick={() => setGetIssueState("week")}
          style={{
            backgroundColor: getIssueState === "week" ? "#4FBFE9" : "white",
          }}
        >
          일주일전
        </button>
        <button
          onClick={() => setGetIssueState("month")}
          style={{
            backgroundColor: getIssueState === "month" ? "#4FBFE9" : "white",
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
            <th>제목</th>
            <th>강의바로가기</th>
          </tr>
        </thead>
        <tbody>
          {allIssueData
            ? allIssueData.map((issue, idx) => {
                return (
                  <tr key={issue._id}>
                    <td>{idx + 1}</td>
                    <td>{issue.ownerNickname}</td>
                    <td>{issue.title}</td>
                    <td onClick={() => navigator(`/${issue.urlName}`)}>
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
