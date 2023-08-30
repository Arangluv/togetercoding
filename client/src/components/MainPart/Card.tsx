import styled from "styled-components";
import { MdOutlineAttachMoney } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { BsGraphUpArrow } from "react-icons/bs";
const Wrapper = styled.div<BackgroundProps>`
  width: 100%;
  height: 25vw;
  border-radius: 20px;
  background-image: ${(props) => props.background};
  padding: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const IconContainer = styled.div`
  width: 20vw;
  height: 20vw;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 15vw;
    height: 15vw;
    color: #fdeb71;
  }
`;
const DescriptionContainer = styled.div`
  width: 40vw;
  height: 20vw;
  display: flex;
  flex-direction: column;
  padding: 2vw;
  padding-left: 4vw;
  h2 {
    font-size: 2.5vw;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 1vw;
  }
  h3 {
    font-size: 1.6vw;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 2vw;
  }
  span {
    margin-bottom: 0.5vw;
    font-size: 1.2vw;
    display: flex;
    align-items: center;
    line-height: 1.5;
    svg {
      margin-right: 0.5vw;
      color: #e74c3c;
      width: 1.5vw;
      height: 1.5vw;
    }
  }
`;
interface IProps {
  title: string;
  subTitle: string;
  content: string[];
  background: string;
  iconType: string;
}
interface BackgroundProps {
  background: string;
}
export default function MainCard({
  title,
  subTitle,
  content,
  background,
  iconType,
}: IProps) {
  return (
    <Wrapper background={background}>
      <IconContainer>
        {iconType === "money" ? (
          <MdOutlineAttachMoney color="#e1b12c" />
        ) : iconType === "portfolio" ? (
          <HiOutlineClipboardCheck color="#2f3640" />
        ) : (
          <BsGraphUpArrow color="#273c75" />
        )}
      </IconContainer>
      <DescriptionContainer>
        <h2>{title}</h2>
        <h3>{subTitle}</h3>
        {content.map((item, idx) => {
          return (
            <span key={idx}>
              <AiOutlineCheckCircle />
              {item}
            </span>
          );
        })}
        {/* <span>
          <AiOutlineCheckCircle />
          요즘 핫한 성격 테스트를 SPA 사이트 만들기
        </span>
        <span>
          <AiOutlineCheckCircle />
          프로젝트에 애드센스 붙이기
        </span>
        <span>
          <AiOutlineCheckCircle />
          애널리틱스를 활용해 트래픽 감시하기
        </span>
        <span>
          <AiOutlineCheckCircle />
          React 기술 스택 향상
        </span> */}
      </DescriptionContainer>
    </Wrapper>
  );
}
