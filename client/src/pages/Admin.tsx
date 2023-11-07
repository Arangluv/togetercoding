import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isAdmin } from "../atom/atoms";
import AdminCheckBox from "../components/admin/AdminCheckBox";
import { Link, Outlet } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  position: relative;
`;
const List = styled.ul`
  width: 20%;
  min-height: 100vh;
  height: 100%;
  border-right: 1px solid #bdc3c7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;

  li {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(189, 195, 199, 0.1);
    transition: all 0.1s ease-in-out;
    a {
      color: ${(props) => props.theme.textColor};
      display: block;
      text-align: center;
      width: 100%;
      padding: 1.2vw 0;
    }
    &:hover {
      background-color: rgba(189, 195, 199, 0.2);
    }
  }
`;
export default function Admin() {
  const [checkAdmin, setCheckAdmin] = useRecoilState(isAdmin);
  return checkAdmin ? (
    <Wrapper>
      <List>
        <li>
          <Link to="upload-lecture">새로운 강의 올리기</Link>
        </li>
        <li>
          <Link to="comments">수강생들 댓글</Link>
        </li>
        <li>
          <Link to="issues">이슈</Link>
        </li>
        <li>
          <Link to="payment-status">결제상황</Link>
        </li>
      </List>
      <Outlet />
    </Wrapper>
  ) : (
    <AdminCheckBox />
  );
}
