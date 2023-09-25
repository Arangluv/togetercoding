import styled from "styled-components";

const Wrapper = styled.div`
  width: 80%;
  min-height: 100vh;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  right: -20%;
  background-color: red;
`;

export default function StudentIssue() {
  return <Wrapper></Wrapper>;
}
