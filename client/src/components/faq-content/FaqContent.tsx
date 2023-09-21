import styled from "styled-components";
import FaqList from "./FaqList";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  frequentQuestion,
  accountQuestion,
  paymentQuestion,
  frequentTitle,
  accountTitle,
  paymentTitle,
} from "../../utill/faqData";
const FaqContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 30vh;
  margin-bottom: 10vw;
  h3 {
    font-size: 1.5vw;
    font-weight: 600;
    margin-bottom: 0.5vw;
    color: ${(props) => props.theme.textColor};
  }
  small {
    font-size: 1.3vw;
    color: ${(props) => props.theme.textColor};
    opacity: 0.8;
  }
`;

export default function FaqContent() {
  const pathname = useLocation().pathname.split("/")[2];
  const [faqData, setFaqData] = useState(frequentQuestion);
  const [faqTitle, setFaqTitle] = useState(frequentTitle);
  console.log(faqData);
  useEffect(() => {
    if (pathname === "frequent-asked") {
      setFaqData(frequentQuestion);
      setFaqTitle(frequentTitle);
      return;
    }
    if (pathname === "account") {
      setFaqData(accountQuestion);
      setFaqTitle(accountTitle);
      return;
    }
    if (pathname === "payment") {
      setFaqData(paymentQuestion);
      setFaqTitle(paymentTitle);
      return;
    }
  }, [pathname]);
  return (
    <FaqContentBox>
      <h3>{faqTitle.main}</h3>
      <small>{faqTitle.sub}</small>
      <FaqList faqData={faqData} />
    </FaqContentBox>
  );
}
