import styled from "styled-components";
import IssueNote from "../dashborad/IssueNote";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 1vw;
`;

const NoIssueBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5vw;
  span {
    font-size: 1.3vw;
    color: #747d8c;
  }
`;
const IssueContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 2vw;
`;

const IssueReplyBox = styled.div`
  width: 100%;
  height: auto;
  padding: 1vw;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: rgba(255, 165, 2, 0.5);
  margin-bottom: 1vw;
`;
const IssueReplyInfo = styled.div`
  width: 100%;
  padding: 1vw;
  display: flex;
  justify-content: space-between;
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
const ReplyContent = styled.div`
  width: 100%;
  padding: 1vw;
  p {
    color: ${(props) => props.theme.textColor};
    font-size: 1.2vw;
    padding: 1vw;
    line-height: 1.5;
  }
`;
export default function IssuePart() {
  return (
    <Wrapper>
      {false ? (
        <NoIssueBox>
          <span>등록된 이슈가 없습니다</span>
        </NoIssueBox>
      ) : (
        <IssueContainer>
          <IssueNote />
          <IssueReplyBox>
            <IssueReplyInfo>
              <span>같이코딩</span>
              <small>2023.07.23</small>
            </IssueReplyInfo>
            <ReplyContent>
              <p>
                대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이
                아닌 법관을 둘 수 있다. 국회의원의 수는 법률로 정하되, 200인
                이상으로 한다. 국무총리는 국무위원의 해임을 대통령에게 건의할 수
                있다. 모든 국민은 근로의 의무를 진다. 국가는 근로의 의무의
                내용과 조건을 민주주의원칙에 따라 법률로 정한다. 모든 국민은
                신속한 재판을 받을 권리를 가진다. 형사피고인은 상당한 이유가
                없는 한 지체없이 공개재판을 받을 권리를 가진다.
              </p>
            </ReplyContent>
          </IssueReplyBox>
          <IssueNote />
          <IssueNote />
        </IssueContainer>
      )}
    </Wrapper>
  );
}
