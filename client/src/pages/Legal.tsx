import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding-top: 6vw;
  background: ${(props) => props.theme.bgImage};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export default function Legal() {
  console.log("legal?");
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}
