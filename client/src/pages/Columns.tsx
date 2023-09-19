import styled from "styled-components";
import ColumnFeed from "../components/columns/ColumnFeed";

const Wrapper = styled.div`
  width: 100%;
  min-height: 126vh;
  padding-top: 8vw;
  padding-bottom: 26vw;
  padding-left: 3vw;
  padding-right: 3vw;
  background: ${(props) => props.theme.bgImage};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;
  height: 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2vw;
  h2 {
    font-size: 2vw;
    font-weight: 700;
    color: ${(props) => props.theme.textColor};
    margin-bottom: 0.5vw;
  }
  h3 {
    font-size: 1.7vw;
    font-weight: 600;
    color: #7f8c8d;
    margin-bottom: 0.5vw;
  }
`;

const ColumnContainer = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
`;
export default function Columns() {
  return (
    <Wrapper>
      <Title>
        <h2>같이코딩 칼럼</h2>
        <h3>코딩하다가 지친 여러분을 위해 읽을거리를 준비해보았어요</h3>
      </Title>
      <ColumnContainer>
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
        <ColumnFeed />
      </ColumnContainer>
    </Wrapper>
  );
}
