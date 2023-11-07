import styled from "styled-components";
import { useStudentPaymentStatusQuery } from "../../hooks/lecture";
import { Link } from "react-router-dom";

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

export default function PaymentStatus() {
  const paymentStatusData = useStudentPaymentStatusQuery();

  return (
    <Wrapper>
      <GetOptionContainer>
        <button>전체</button>
        <button>전체</button>
        <button>전체</button>
      </GetOptionContainer>
      <CommentTable>
        <thead>
          <tr>
            <th>번호</th>
            <th>구매상품</th>
            <th>구매일자</th>
            <th>가격</th>
            <th>결제방법</th>
            <th>구매자</th>
            <th>이메일</th>
            <th>영수증</th>
          </tr>
        </thead>
        <tbody>
          {paymentStatusData
            ? paymentStatusData.map((paymentStatus, idx) => {
                return (
                  <tr key={paymentStatus._id}>
                    <td>{idx + 1}</td>
                    <td>{paymentStatus.lectureName}</td>
                    <td>{paymentStatus.paymentAt}</td>
                    <td>{paymentStatus.amount}</td>
                    <td>{paymentStatus.method}</td>
                    <td>{paymentStatus.buyer.name}</td>
                    <td>{paymentStatus.buyer.email}</td>
                    <td>
                      <Link to={paymentStatus.receiptUrl}>영수증 링크</Link>
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
