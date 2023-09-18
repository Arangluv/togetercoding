import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  svg {
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.textColor};
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
  padding: 1vw;
`;
const NoteProfileInfo = styled.div`
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1vw;
  span {
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
    font-size: 1.3vw;
  }
  small {
    color: ${(props) => props.theme.successColor};
    transition: all 0.1s ease-in-out;
    &:hover {
      cursor: pointer;
      filter: brightness(1.1);
    }
  }
`;
const NoteContent = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 1vw;
  p {
    padding: 1vw;
    font-size: 1.2vw;
    color: ${(props) => props.theme.textColor};
    line-height: 1.5;
    white-space: pre-wrap;
  }
`;
interface IProps {
  ownerProfileUrl: string;
  ownerNickname: string;
  content: string;
  urlName: string;
}
export default function WriteNote({
  ownerProfileUrl,
  ownerNickname,
  content,
  urlName,
}: IProps) {
  const navigator = useNavigate();

  return (
    <NoteContainer>
      <NoteProfileImageContainer>
        <NoteProfileSubContainer>
          {ownerProfileUrl ? (
            <img src={ownerProfileUrl} alt="student comment profile image" />
          ) : (
            <FaUserCircle />
          )}
        </NoteProfileSubContainer>
      </NoteProfileImageContainer>
      <NoteContentContainer>
        <NoteProfileInfo>
          <span>{ownerNickname}</span>
          <small onClick={() => navigator(`/${urlName}`)}>
            해당 목차 바로가기
          </small>
        </NoteProfileInfo>
        <NoteContent>
          <p>{content}</p>
        </NoteContent>
      </NoteContentContainer>
    </NoteContainer>
  );
}
