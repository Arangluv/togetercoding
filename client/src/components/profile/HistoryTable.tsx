import styled from "styled-components";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { usePurchasesHistoryQuery } from "../../hooks/lecture";
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
  height: auto;
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
    a {
      color: white;
    }
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
interface IProps {
  purchaseData: DProps[] | undefined;
}
interface DProps {
  paymentAt: string;
  receiptUrl: string;
  amount: number;
  method: string;
  lectureName: string;
}
export default function HistoryTable({ purchaseData }: IProps) {
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
          {purchaseData
            ? purchaseData.map((history) => {
                return (
                  <tr>
                    <td style={{ width: "40%" }}>{history.lectureName} </td>
                    <td>
                      {history.amount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      ₩
                    </td>
                    <td>{history.paymentAt.slice(0, 10)}</td>
                    <td>{history.method}</td>
                    <td>
                      <a href={history.receiptUrl}>
                        <ReceiptLongIcon />
                      </a>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    </Wrapper>
  );
}
