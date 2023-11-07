import styled from "styled-components";
import ProfileList from "../components/profile/ProfileList";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { studentLoginState } from "../atom/atoms";
import { useEffect } from "react";

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
  const stdLoginState = useRecoilValue(studentLoginState);
  const navigator = useNavigate();
  useEffect(() => {
    if (!stdLoginState.email) {
      navigator("/");
    }
  }, [stdLoginState]);
  return (
    <Wrapper>
      <ProfileList />
      <Outlet />
    </Wrapper>
  );
}
