import styled from "styled-components";
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { paymentStste, studentLoginState } from "../../atom/atoms";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  h1 {
    color: black;
    font-size: 2vw;
    font-weight: 600;
    margin-bottom: 1vw;
  }
  button {
    margin-top: 2vw;
    width: 90%;
    padding: 1vw 0;
    background-color: transparent;
  }
`;
const Widget = styled.div`
  flex-direction: column;
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PurchaseDetailContainer = styled.div`
  width: 30%;
  height: 100%;
  background-color: #f9fafb;
  padding: 3vw 2vw;
  position: relative;
  h3 {
    font-size: 1.4vw;
    font-weight: 600;
    margin-bottom: 0.5vw;
  }
  span {
    font-size: 1.1vw;
  }
  #purchase-content {
    display: block;
    margin-bottom: 2vw;
    color: rgba(0, 0, 0, 0.8);
  }
  #purchase-price {
    font-size: 2vw;
    font-weight: 600;
  }
  svg {
    position: absolute;
    top: 1vw;
    right: 1vw;
    width: 2vw;
    height: 2vw;
    color: rgba(0, 0, 0, 0.5);
    &:hover {
      cursor: pointer;
    }
  }
  button {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.3vw;
    color: ${(props) => props.theme.textColor};
    background-color: #3181f6;
    border: none;
    border-radius: 10px;
    width: 90%;
    bottom: 2vw;
    transition: all 0.1s ease-in-out;
    &:hover {
      cursor: pointer;
      filter: brightness(1.1);
    }
  }
`;
interface IProps {
  lectureName: string;
  price: string;
}
export default function Payment({ lectureName, price }: IProps) {
  // url params
  const urlName = useLocation().pathname.split("/")[1];
  // Toss Payment
  const stdLoginState = useRecoilValue(studentLoginState);
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const clientKey = "test_ck_P24xLea5zVA69Mpa5glrQAMYNwW6";
  // const clientKey = "test_ck_P24xLea5zVA69Mpa5glrQAMYNwW623";
  const customerKey = nanoid(); //회원 식별번호
  const setPaymentState = useSetRecoilState(paymentStste);
  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      paymentWidget.renderPaymentMethods("#payment-widget", Number(price));

      paymentWidgetRef.current = paymentWidget;
    })();
  }, []);
  return (
    <Wrapper>
      <Widget id="payment-widget"></Widget>
      <PurchaseDetailContainer>
        <MdOutlineCancel onClick={() => setPaymentState("cancel")} />
        <h3>구매내용</h3>
        <span id="purchase-content">{lectureName}</span>
        <h3>결제금액</h3>
        <span id="purchase-price">
          {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
        <button
          onClick={async () => {
            const paymentWidget = paymentWidgetRef.current;
            try {
              await paymentWidget?.requestPayment({
                orderId: nanoid(),
                orderName: `${lectureName}`,
                customerName: `${stdLoginState.username}`,
                customerEmail: `${stdLoginState.email}`,
                successUrl: `${window.location.origin}/payment/success`,
                failUrl: `${window.location.origin}/payment/fail`,
              });
            } catch (err) {
              console.log(err);
            }
          }}
        >
          결제하기
        </button>
      </PurchaseDetailContainer>
    </Wrapper>
  );
}
