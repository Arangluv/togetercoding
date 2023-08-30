import styled from "styled-components";
import LoadingWindow from "../components/LoadingWindow";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { kakaoLogin } from "../api/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { studentLoginState } from "../atom/atoms";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

export default function KakaoLoading() {
  const location = useLocation();
  const navigator = useNavigate();
  const loginToken = location.search.split("=")[1];
  const setStudentLoginState = useSetRecoilState(studentLoginState);
  const { mutate, data } = useMutation({
    mutationFn: () => kakaoLogin({ loginToken }),
    onSuccess: (loginData) => {
      toast.success("일단 성공");
      const { name, email, nickname, profileImg } = loginData;
      setStudentLoginState({
        username: name,
        email,
        nickname,
        profileImg,
      });
      navigator("/");
    },
    onError: () => {
      toast.error("에러발생!!");
    },
  });
  useEffect(() => {
    mutate();
  }, []);
  return (
    <Wrapper>
      <LoadingWindow loading={true} />
    </Wrapper>
  );
}
