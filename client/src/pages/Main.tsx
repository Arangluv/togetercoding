import styled from "styled-components";
import MainFirst from "../components/MainFirst";
import MainSecond from "../components/MainSecond";
import MainLast from "../components/MainLast";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default function Main() {
  return (
    <Wrapper>
      <MainFirst />
      <MainSecond />
      <MainLast />
    </Wrapper>
  );
}
