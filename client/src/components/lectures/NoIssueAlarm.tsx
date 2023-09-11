import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  strong {
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
    opacity: 0.7;
  }
`;

export default function NoIssueAlarm() {
  return (
    <Wrapper>
      <strong>아직 작성된 이슈가 없네요 :)</strong>
    </Wrapper>
  );
}
