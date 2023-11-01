import styled from "styled-components";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { nanoid } from "nanoid";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { postPaymentCheck } from "../../api/api";
import LoadingWindow from "../LoadingWindow";
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
  button {
    margin-top: 10vw;
    width: 30%;
    background-color: ${(props) => props.theme.successColor};
    color: white;
    border: none;
    padding: 1vw;
    font-size: 1.5vw;
    border-radius: 10px;
    transition: all 0.1s ease-in-out;
    /* font-weight: 600; */
    &:hover {
      cursor: pointer;
      filter: brightness(1.1);
    }
  }
`;
interface SuccessProps {
  approvedAt: string;
  method: string;
  orderId: string;
  orderName: string;
  totalAmount: number;
  lectureUrl: string;
}

export default function Success() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const paymentKey = searchParams.get("paymentKey");
  const amount = searchParams.get("amount");
  const [successData, setSuccessData] = useState<null | SuccessProps>(null);
  const navigator = useNavigate();
  const { mutate: postPaymentRequest, isLoading } = useMutation({
    mutationFn: () =>
      postPaymentCheck({
        orderId,
        paymentKey,
        encodingSecretKey: window.btoa("test_sk_4vZnjEJeQVxLz7NOwPDVPmOoBN0k:"), // 토스 시크릿키
        amount: Number(amount),
        idempotencyKey: nanoid(),
      }),
    onSuccess: (result) => {
      const { data } = result;
      const newSuccessData = {
        approvedAt: data.approvedAt,
        method: data.method,
        orderId: data.orderId,
        orderName: data.orderName,
        lectureUrl: data.lectureUrl,
        totalAmount: data.totalAmount,
      };
      setSuccessData(newSuccessData);
      toast.success("결제에 성공했습니다");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
      navigator(`/`);
    },
  });
  useEffect(() => {
    postPaymentRequest();
  }, [searchParams]);
  return (
    <>
      <Wrapper></Wrapper>
      {isLoading ? (
        <LoadingWindow loading={isLoading} />
      ) : (
        <Overlay>
          <SuccessBox>
            <AiOutlineCheckCircle />
            <span id="success-text">결제가 완료되었습니다</span>
            <small id="order-id">
              주문아이디: <span>{searchParams.get("orderId")}</span>
            </small>
            <small id="order-id">
              결제금액:{" "}
              <span>
                {/* {Number(searchParams.get("amount")).toLocaleString()}원 */}
                {`${Number(successData?.totalAmount)}원`}
              </span>
            </small>
            <small id="order-id">
              구매상품: <span>{successData?.orderName}</span>
            </small>
            <small id="order-id">
              처리일자: <span>{successData?.approvedAt.slice(0, 10)}</span>
            </small>
            <button
              onClick={() => navigator(`/${successData?.lectureUrl}/lectures`)}
            >
              강의바로가기
            </button>
          </SuccessBox>
        </Overlay>
      )}
    </>
  );
}
