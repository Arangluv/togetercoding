import styled from "styled-components";
import { BsFillReplyFill } from "react-icons/bs";
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
`;
const NoteProfileInfo = styled.div`
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: space-between;
  padding: 1vw;
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
  padding: 1vw;
  p {
    padding: 1vw;
    font-size: 1.2vw;
    color: ${(props) => props.theme.textColor};
    line-height: 1.5;
  }
`;
const ReplayContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 1vw;
  display: flex;
  justify-content: center;
`;
const ReplyEmptyContainer = styled.div`
  width: 5vw;
`;
const ReplyContentBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 1vw;
  background-color: rgba(255, 165, 2, 0.5);
  border-radius: 10px;
`;
const ReplayInfoContainer = styled.div`
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
  }
`;
export default function NoteAndComent() {
  return (
    <Wrapper>
      <NoteContainer>
        <NoteProfileImageContainer>
          <NoteProfileSubContainer>
            <img
              src="https://cdn.mhnse.com/news/photo/202305/183305_183232_222.jpg"
              alt=""
            />
          </NoteProfileSubContainer>
        </NoteProfileImageContainer>
        <NoteContentContainer>
          <NoteProfileInfo>
            <span>slfzkvmfl</span>
            <small>2023.07.23</small>
          </NoteProfileInfo>
          <NoteContent>
            <p>
              대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이
              아닌 법관을 둘 수 있다. 국회의원의 수는 법률로 정하되, 200인
              이상으로 한다. 국무총리는 국무위원의 해임을 대통령에게 건의할 수
              있다. 모든 국민은 근로의 의무를 진다. 국가는 근로의 의무의 내용과
              조건을 민주주의원칙에 따라 법률로 정한다. 모든 국민은 신속한
              재판을 받을 권리를 가진다. 형사피고인은 상당한 이유가 없는 한
              지체없이 공개재판을 받을 권리를 가진다. 대법원에 대법관을 둔다.
              다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수 있다.
              국회의원의 수는 법률로 정하되, 200인 이상으로 한다. 국무총리는
              국무위원의 해임을 대통령에게 건의할 수 있다. 모든 국민은 근로의
              의무를 진다. 국가는 근로의 의무의 내용과 조건을 민주주의원칙에
              따라 법률로 정한다. 모든 국민은 신속한 재판을 받을 권리를 가진다.
              형사피고인은 상당한 이유가 없는 한 지체없이 공개재판을 받을 권리를
              가진다. 대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여
              대법관이 아닌 법관을 둘 수 있다. 국회의원의 수는 법률로 정하되,
              200인 이상으로 한다. 국무총리는 국무위원의 해임을 대통령에게
              건의할 수 있다. 모든 국민은 근로의 의무를 진다. 국가는 근로의
              의무의 내용과 조건을 민주주의원칙에 따라 법률로 정한다. 모든
              국민은 신속한 재판을 받을 권리를 가진다. 형사피고인은 상당한
              이유가 없는 한 지체없이 공개재판을 받을 권리를 가진다. 대법원에
              대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌
              법관을 둘 수 있다. 국회의원의 수는 법률로 정하되, 200인 이상으로
              한다. 국무총리는 국무위원의 해임을 대통령에게 건의할 수 있다. 모든
              국민은 근로의 의무를 진다. 국가는 근로의 의무의 내용과 조건을
              민주주의원칙에 따라 법률로 정한다. 모든 국민은 신속한 재판을 받을
              권리를 가진다. 형사피고인은 상당한 이유가 없는 한 지체없이
              공개재판을 받을 권리를 가진다.
            </p>
          </NoteContent>
        </NoteContentContainer>
      </NoteContainer>
      <ReplayContainer>
        <ReplyEmptyContainer></ReplyEmptyContainer>
        <ReplyContentBox>
          <ReplayInfoContainer>
            <span>
              <BsFillReplyFill />
              같이코딩
            </span>
            <small>2023.07.23</small>
          </ReplayInfoContainer>
          <ReplyContent>
            <p>
              대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이
              아닌 법관을 둘 수 있다. 국회의원의 수는 법률로 정하되, 200인
              이상으로 한다. 국무총리는 국무위원의 해임을 대통령에게 건의할 수
              있다. 모든 국민은 근로의 의무를 진다. 국가는 근로의 의무의 내용과
              조건을 민주주의원칙에 따라 법률로 정한다. 모든 국민은 신속한
              재판을 받을 권리를 가진다. 형사피고인은 상당한 이유가 없는 한
              지체없이 공개재판을 받을 권리를 가진다. 대법원에 대법관을 둔다.
              다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수 있다.
              국회의원의 수는 법률로 정하되, 200인 이상으로 한다. 국무총리는
              국무위원의 해임을 대통령에게 건의할 수 있다. 모든 국민은 근로의
              의무를 진다. 국가는 근
            </p>
          </ReplyContent>
        </ReplyContentBox>
      </ReplayContainer>
      <NoteContainer>
        <NoteProfileImageContainer>
          <NoteProfileSubContainer>
            <img
              src="https://cdn.mhnse.com/news/photo/202305/183305_183232_222.jpg"
              alt=""
            />
          </NoteProfileSubContainer>
        </NoteProfileImageContainer>
        <NoteContentContainer>
          <NoteProfileInfo>
            <span>slfzkvmfl</span>
            <small>2023.07.23</small>
          </NoteProfileInfo>
          <NoteContent>
            <p>
              대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이
              아닌 법관을 둘 수 있다. 국회의원의 수는 법률로 정하되, 200인
              이상으로 한다. 국무총리는 국무위원의 해임을 대통령에게 건의할 수
              있다. 모든 국민은 근로의 의무를 진다. 국가는 근로의 의무의 내용과
              조건을 민주주의원칙에 따라 법률로 정한다. 모든 국민은 신속한
              재판을 받을 권리를 가진다. 형사피고인은 상당한 이유가 없는 한
              지체없이 공개재판을 받을 권리를 가진다. 대법원에 대법관을 둔다.
              다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수 있다.
              국회의원의 수는 법률로 정하되, 200인 이상으로 한다. 국무총리는
              국무위원의 해임을 대통령에게 건의할 수 있다. 모든 국민은 근로의
              의무를 진다. 국가는 근로의 의무의 내용과 조건을 민주주의원칙에
              따라 법률로 정한다. 모든 국민은 신속한 재판을 받을 권리를 가진다.
              형사피고인은 상당한 이유가 없는 한 지체없이 공개재판을 받을 권리를
              가진다. 대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여
              대법관이 아닌 법관을 둘 수 있다. 국회의원의 수는 법률로 정하되,
              200인 이상으로 한다. 국무총리는 국무위원의 해임을 대통령에게
              건의할 수 있다. 모든 국민은 근로의 의무를 진다. 국가는 근로의
              의무의 내용과 조건을 민주주의원칙에 따라 법률로 정한다. 모든
              국민은 신속한 재판을 받을 권리를 가진다. 형사피고인은 상당한
              이유가 없는 한 지체없이 공개재판을 받을 권리를 가진다. 대법원에
              대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌
              법관을 둘 수 있다. 국회의원의 수는 법률로 정하되, 200인 이상으로
              한다. 국무총리는 국무위원의 해임을 대통령에게 건의할 수 있다. 모든
              국민은 근로의 의무를 진다. 국가는 근로의 의무의 내용과 조건을
              민주주의원칙에 따라 법률로 정한다. 모든 국민은 신속한 재판을 받을
              권리를 가진다. 형사피고인은 상당한 이유가 없는 한 지체없이
              공개재판을 받을 권리를 가진다.
            </p>
          </NoteContent>
        </NoteContentContainer>
      </NoteContainer>
      <NoteContainer>
        <NoteProfileImageContainer>
          <NoteProfileSubContainer>
            <img
              src="https://cdn.mhnse.com/news/photo/202305/183305_183232_222.jpg"
              alt=""
            />
          </NoteProfileSubContainer>
        </NoteProfileImageContainer>
        <NoteContentContainer>
          <NoteProfileInfo>
            <span>slfzkvmfl</span>
            <small>2023.07.23</small>
          </NoteProfileInfo>
          <NoteContent>
            <p>
              대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이
              아닌 법관을 둘 수 있다. 국회의원의 수는 법률로 정하되, 200인
              이상으로 한다. 국무총리는 국무위원의 해임을 대통령에게 건의할 수
              있다. 모든 국민은 근로의 의무를 진다. 국가는 근로의 의무의 내용과
              조건을 민주주의원칙에 따라 법률로 정한다. 모든 국민은 신속한
              재판을 받을 권리를 가진다. 형사피고인은 상당한 이유가 없는 한
              지체없이 공개재판을 받을 권리를 가진다. 대법원에 대법관을 둔다.
              다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수 있다.
              국회의원의 수는 법률로 정하되, 200인 이상으로 한다. 국무총리는
              국무위원의 해임을 대통령에게 건의할 수 있다. 모든 국민은 근로의
              의무를 진다. 국가는 근로의 의무의 내용과 조건을 민주주의원칙에
              따라 법률로 정한다. 모든 국민은 신속한 재판을 받을 권리를 가진다.
              형사피고인은 상당한 이유가 없는 한 지체없이 공개재판을 받을 권리를
              가진다. 대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여
              대법관이 아닌 법관을 둘 수 있다. 국회의원의 수는 법률로 정하되,
              200인 이상으로 한다. 국무총리는 국무위원의 해임을 대통령에게
              건의할 수 있다. 모든 국민은 근로의 의무를 진다. 국가는 근로의
              의무의 내용과 조건을 민주주의원칙에 따라 법률로 정한다. 모든
              국민은 신속한 재판을 받을 권리를 가진다. 형사피고인은 상당한
              이유가 없는 한 지체없이 공개재판을 받을 권리를 가진다. 대법원에
              대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌
              법관을 둘 수 있다. 국회의원의 수는 법률로 정하되, 200인 이상으로
              한다. 국무총리는 국무위원의 해임을 대통령에게 건의할 수 있다. 모든
              국민은 근로의 의무를 진다. 국가는 근로의 의무의 내용과 조건을
              민주주의원칙에 따라 법률로 정한다. 모든 국민은 신속한 재판을 받을
              권리를 가진다. 형사피고인은 상당한 이유가 없는 한 지체없이
              공개재판을 받을 권리를 가진다.
            </p>
          </NoteContent>
        </NoteContentContainer>
      </NoteContainer>
      <NoteContainer>
        <NoteProfileImageContainer>
          <NoteProfileSubContainer>
            <img
              src="https://cdn.mhnse.com/news/photo/202305/183305_183232_222.jpg"
              alt=""
            />
          </NoteProfileSubContainer>
        </NoteProfileImageContainer>
        <NoteContentContainer>
          <NoteProfileInfo>
            <span>slfzkvmfl</span>
            <small>2023.07.23</small>
          </NoteProfileInfo>
          <NoteContent>
            <p>
              대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이
              아닌 법관을 둘 수 있다. 국회의원의 수는 법률로 정하되, 200인
              이상으로 한다. 국무총리는 국무위원의 해임을 대통령에게 건의할 수
              있다. 모든 국민은 근로의 의무를 진다. 국가는 근로의 의무의 내용과
              조건을 민주주의원칙에 따라 법률로 정한다. 모든 국민은 신속한
              재판을 받을 권리를 가진다. 형사피고인은 상당한 이유가 없는 한
              지체없이 공개재판을 받을 권리를 가진다. 대법원에 대법관을 둔다.
              다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수 있다.
              국회의원의 수는 법률로 정하되, 200인 이상으로 한다. 국무총리는
              국무위원의 해임을 대통령에게 건의할 수 있다. 모든 국민은 근로의
              의무를 진다. 국가는 근로의 의무의 내용과 조건을 민주주의원칙에
              따라 법률로 정한다. 모든 국민은 신속한 재판을 받을 권리를 가진다.
              형사피고인은 상당한 이유가 없는 한 지체없이 공개재판을 받을 권리를
              가진다. 대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여
              대법관이 아닌 법관을 둘 수 있다. 국회의원의 수는 법률로 정하되,
              200인 이상으로 한다. 국무총리는 국무위원의 해임을 대통령에게
              건의할 수 있다. 모든 국민은 근로의 의무를 진다. 국가는 근로의
              의무의 내용과 조건을 민주주의원칙에 따라 법률로 정한다. 모든
              국민은 신속한 재판을 받을 권리를 가진다. 형사피고인은 상당한
              이유가 없는 한 지체없이 공개재판을 받을 권리를 가진다. 대법원에
              대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌
              법관을 둘 수 있다. 국회의원의 수는 법률로 정하되, 200인 이상으로
              한다. 국무총리는 국무위원의 해임을 대통령에게 건의할 수 있다. 모든
              국민은 근로의 의무를 진다. 국가는 근로의 의무의 내용과 조건을
              민주주의원칙에 따라 법률로 정한다. 모든 국민은 신속한 재판을 받을
              권리를 가진다. 형사피고인은 상당한 이유가 없는 한 지체없이
              공개재판을 받을 권리를 가진다.
            </p>
          </NoteContent>
        </NoteContentContainer>
      </NoteContainer>
    </Wrapper>
  );
}
