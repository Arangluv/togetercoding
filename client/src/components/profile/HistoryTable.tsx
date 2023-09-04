import styled from "styled-components";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
const Wrapper = styled.div`
  width: 100%;
  min-height: 40vh;
  padding-left: 2vw;
`;
const Title = styled.div`
  height: 5vh;
  width: 100%;
  border-bottom: 2px solid #ecf0f1;
  display: flex;
  align-items: center;
  padding-bottom: 1vw;
  h2 {
    font-size: 1.3vw;
    font-weight: 600;
    color: #ecf0f1;
  }
`;
const Table = styled.table`
  width: 100%;
  height: 35vh;
  border-collapse: collapse;
  margin-top: 2vw;
  border-radius: 10px;

  td,
  th,
  tr {
    color: white;

    padding: 1.5vw 0;
    text-align: center;
  }
  th {
    /* display: flex;
    align-items: center;
    justify-content: center; */
    /* display: flex; */
    background-color: #2f3542;
    font-size: 1.4vw;
    font-weight: 600;
    height: 7vh;
    text-align: center;
  }
  td {
    margin: 0;
    svg:hover {
      cursor: pointer;
      color: #5352ed;
    }
    /* padding: 2vw; */
  }
  tr:nth-child(2n) {
    background-color: #747d8c;
  }
  tr:nth-child(2n-1) {
    background-color: #57606f;
  }
`;
export default function HistoryTable() {
  return (
    <Wrapper>
      <Title>
        <h2>구매내역</h2>
      </Title>
      <Table>
        <thead>
          <tr>
            <th>클래스이름</th>
            <th>가격 (₩)</th>
            <th>구매날짜</th>
            <th>결제수단</th>
            <th>영수증</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>React로 수익화 웹서비스 만들기</td>
            <td>120,000₩</td>
            <td>2023.07.04 09시</td>
            <td>카드</td>
            <td>
              <ReceiptLongIcon />
            </td>
          </tr>
          <tr>
            <td>React로 수익화 웹서비스 만들기</td>
            <td>120,000₩</td>
            <td>2023.07.04 09시</td>
            <td>카드</td>
            <td>
              <ReceiptLongIcon />
            </td>
          </tr>
          <tr>
            <td>React로 수익화 웹서비스 만들기</td>
            <td>120,000₩</td>
            <td>2023.07.04 09시</td>
            <td>카드</td>
            <td>
              <ReceiptLongIcon />
            </td>
          </tr>
          <tr>
            <td>React로 수익화 웹서비스 만들기</td>
            <td>120,000₩</td>
            <td>2023.07.04 09시</td>
            <td>카드</td>
            <td>
              <ReceiptLongIcon />
            </td>
          </tr>
        </tbody>
      </Table>
    </Wrapper>
  );
}
