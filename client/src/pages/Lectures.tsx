import styled from "styled-components";
import LectureSideBar from "../components/lectures/LectureSideBar";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  background-color: #222f3e;
  position: relative;
`;

export default function Lectures() {
  return (
    <Wrapper>
      <LectureSideBar />
      <Outlet />
    </Wrapper>
  );
}
