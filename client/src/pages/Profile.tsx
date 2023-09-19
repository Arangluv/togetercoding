import styled from "styled-components";
import ProfileList from "../components/ProfilePart/ProfileList";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  min-height: 126vh;
  height: auto;
  padding-bottom: 26vh;
  padding-top: 18vh;
  display: flex;
  background-image: ${(props) => props.theme.bgImage};
`;
export default function Profile() {
  return (
    <Wrapper>
      <ProfileList />
      <Outlet />
    </Wrapper>
  );
}
