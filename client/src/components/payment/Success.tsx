import styled from "styled-components";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { nanoid } from "nanoid";
import { useLocation, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  background: ${(props) => props.theme.bgImage};
`;
const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SuccessBox = styled.div`
  width: 70%;
  height: 70vh;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vw 0;
  svg {
    width: 6vw;
    height: 6vw;
    /* border: 1px solid #6bc070; */
    box-shadow: 0px 0px 10px rgba(107, 192, 112, 0.5);
    border-radius: 100%;
    color: ${(props) => props.theme.successColor};
    margin-bottom: 2vw;
  }
  #success-text {
    font-size: 2vw;
    font-weight: 600;
    color: #222831;
    margin-bottom: 0.5vw;
  }
  #order-id {
    color: rgba(34, 40, 49, 0.8);
    margin-bottom: 0.5vw;
    span {
      color: #222831;
      font-weight: 600;
    }
  }
`;
export default function Success() {
  const [searchParams] = useSearchParams();
  console.log(searchParams);
  const paymentKey = searchParams.get("paymentKey");
  const { mutate: postPaymentRequest } = useMutation({
    mutationFn: async () => {
      return await axios({
        url: "https://api.tosspayments.com/v1/payments/confirm",
        method: "POST",
        headers: {
          Authorization: `Basic ${window.btoa(
            "test_sk_4vZnjEJeQVxLz7NOwPDVPmOoBN0k:"
          )}`,
          "Content-Type": "application/json",
          "Idempotency-Key": nanoid(),
        },
        data: {
          paymentKey,
          amount: 1000, // 정수타입이여야함
          orderId: searchParams.get("orderId"),
        },
      });
    },
    onSuccess: (data) => {
      console.log("성공시");
      console.log(data);
      toast.success("결제에 성공했습니다");
    },
    onError: (error) => {
      console.log("결제 실패시");
      console.log(error);
    },
  });
  useEffect(() => {
    postPaymentRequest();
  }, [searchParams]);
  return (
    <>
      <Wrapper></Wrapper>
      <Overlay>
        <SuccessBox>
          <AiOutlineCheckCircle />
          <span id="success-text">결제가 완료되었습니다</span>
          <small id="order-id">
            주문아이디: <span>{searchParams.get("orderId")}</span>
          </small>
          <small id="order-id">
            결제금액:{" "}
            <span>{Number(searchParams.get("amount")).toLocaleString()}원</span>
          </small>
        </SuccessBox>
      </Overlay>
    </>
  );
}
