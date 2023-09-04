import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { adminTokenCheck } from "../../api/adminApi";
import LoadingWindow from "../LoadingWindow";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { isAdmin } from "../../atom/atoms";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function AdminCheckBox() {
  const { data, isLoading } = useQuery(["adminCheck"], adminTokenCheck);
  const setCheckAdmin = useSetRecoilState(isAdmin);
  useEffect(() => {
    if (!data) {
      return;
    }
    if (data.code === process.env.REACT_APP_ADMIN_PASSWORD) {
      setCheckAdmin(true);
    }
  }, [data]);
  return isLoading ? (
    <LoadingWindow loading={isLoading} />
  ) : (
    <Wrapper></Wrapper>
  );
}
