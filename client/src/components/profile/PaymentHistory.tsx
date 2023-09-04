import styled from "styled-components";
import HistoryTable from "./HistoryTable";

const Wrapper = styled.div`
  width: 80%;
  padding-right: 5vw;
  height: 82vh;
  display: flex;
  flex-direction: column;
`;
const EmptyNotice = styled.div`
  width: 80%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 2vw;
    color: ${(props) => props.theme.textColor};
  }
`;
export default function PaymentHistory() {
  return (
    <Wrapper>
      {false ? (
        <HistoryTable />
      ) : (
        <EmptyNotice>
          <span>불러올 결제 내역이 없습니다 :)</span>
        </EmptyNotice>
      )}
    </Wrapper>
  );
}
