import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineArrowRight, AiOutlineCheckCircle } from "react-icons/ai";
import { SiKakaotalk } from "react-icons/si";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { kakaoLogin, studentLogin } from "../api/api";
import { studentLoginState } from "../atom/atoms";
import { useEffect, useState } from "react";
import { useReceiveAgainEmailVerificationMutate } from "../hooks/lecture";

const Wrapper = styled.div`
  width: 100%;
  height: 128vh;
  padding-bottom: 28vh;
  padding-top: 6vw;
  /* border: 5px solid red; */
  background: ${(props) => props.theme.bgImage};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  font-size: 2vw;
  margin-bottom: 2vw;
`;
const Form = styled.form`
  width: 40%;
  height: auto;
  padding: 2vw 0;
  background-color: ${(props) => props.theme.insideBgColor};
  border-radius: 20px;
  padding: 3vw 4vw;
  display: flex;
  flex-direction: column;
`;
const NameInfoBox = styled.div`
  width: 100%;
  height: 6vw;
  display: flex;
  justify-content: space-between;
`;
const EmailLabel = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 0.5vw;
  span {
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    font-size: 1.2vw;
    display: flex;
    align-items: center;
    small {
      font-size: 1vw;
      margin-left: 1vw;
      color: ${(props) => props.theme.errorColor};
    }
  }
  input[type="text"] {
    width: 100%;
    border-radius: 10px;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.textColor};
    padding: 0.5vw 1vw;
    font-size: 1.2vw;
    margin-top: 1vw;
    transition: all 0.1s ease-in-out;
    &:focus {
      outline: none;
      border-color: #c8d6e5;
    }
  }
`;
const SubmitLabel = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8vw 0;
  border-radius: 10px;
  margin-top: 1vw;
  background-color: ${(props) => props.theme.textColor};
  border: 1px solid rgba(255, 255, 255, 0);
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    background-color: ${(props) => props.theme.bgColor};
    border: 1px solid ${(props) => props.theme.bgColor};
    span {
      color: ${(props) => props.theme.textColor};
    }
  }
  span {
    color: ${(props) => props.theme.bgColor};
    font-weight: 600;
    font-size: 1.2vw;
  }
  input[type="submit"] {
    display: none;
  }
`;
const JoinLabel = styled(SubmitLabel)`
  &:hover {
    background-color: #22bb33;
    border: 1px solid rgba(255, 255, 255, 0);
  }
  span {
    color: #22bb33;
  }
`;
const ForgetEmailBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5vw;
  a {
    color: #95a5a6;
    font-size: 1.1vw;
    display: flex;
    align-items: center;
    transition: all 0.1s ease-in-out;
    svg {
      margin-left: 0.1vw;
    }
    &:hover {
      color: ${(props) => props.theme.textColor};
    }
  }
`;
const ExtraError = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1vw;
  span {
    color: ${(props) => props.theme.errorColor};
    font-size: 1.2vw;
  }
  small {
    margin-top: 1vw;
    color: ${(props) => props.theme.successColor};
    font-weight: 600;
    transition: all 0.1s ease-in-out;
    &:hover {
      cursor: pointer;
      filter: brightness(1.1);
    }
  }
`;
const BorderBox = styled.div`
  width: 40%;
  height: 2vw;
  margin-top: 3vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    color: white;
  }
  .border_div {
    width: 45%;
    border: 1px solid white;
  }
`;
const KakaoLoginLink = styled.a`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: yellow;
  border: none;
  margin-top: 3vw;
  padding: 1vw 0;
  font-size: 1.2vw;
  color: ${(props) => props.theme.bgColor};
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
  svg {
    width: 1.6vw;
    height: 1.6vw;
    color: ${(props) => props.theme.bgColor};
    margin-right: 0.5vw;
  }
`;
const LoginOkContainer = styled.div`
  width: 60%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(34, 187, 51, 0.5);
  border-radius: 20px;
  padding: 2vw;
  svg {
    color: #22bb33;
    width: 6vw;
    height: 6vw;
    margin-bottom: 1vw;
  }
  span {
    color: ${(props) => props.theme.textColor};
    font-size: 1.3vw;
    span {
      font-weight: 600;
    }
  }
  small {
    margin-top: 1vw;
    color: #dfe4ea;
  }
`;
interface DProps {
  email: string;
  extraError?: string;
}
export default function Login() {
  const navigator = useNavigate();
  const [loginOk, setLoginOk] = useState(false);
  const { register, handleSubmit, formState, clearErrors, setError, watch } =
    useForm<DProps>();
  const loginState = useRecoilValue(studentLoginState);
  // 로그인 검사 -> 로그인했는데 접근하면 안된다.
  useEffect(() => {
    if (loginState.email) {
      navigator("/");
    }
  }, [loginState]);
  const { mutate } = useMutation({
    mutationFn: studentLogin,
    onSuccess: () => {
      toast.success("인증링크를 보냈습니다");
      setLoginOk(true);
    },
    onError: (error: any) => {
      console.log(error);
      toast.error("인증링크를 보내는데 문제가 발생했습니다");
      setError("extraError", {
        message: error?.response.data.message,
      });
    },
  });
  const onValid = (data: DProps) => {
    mutate(data);
  };
  const receiveAgainMutate = useReceiveAgainEmailVerificationMutate({
    email: watch("email"),
    setLoginOk,
  });
  return (
    <Wrapper>
      <Title>같이코딩 로그인</Title>
      {!loginOk ? (
        <>
          <Form onSubmit={handleSubmit(onValid)}>
            <NameInfoBox>
              <EmailLabel htmlFor="email">
                <span>
                  이메일
                  {formState.errors.email ? (
                    <small>{formState.errors.email.message}</small>
                  ) : null}
                </span>
                <input
                  {...register("email", {
                    required: "이메일을 입력해주세요",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "이메일 형식이어야 합니다",
                    },
                  })}
                  placeholder="example@naver.com"
                  id="email"
                  type="text"
                  onFocus={() => clearErrors("extraError")}
                />
              </EmailLabel>
            </NameInfoBox>
            <SubmitLabel htmlFor="login_submit">
              <span>로그인</span>
              <input type="submit" id="login_submit" />
            </SubmitLabel>
            <JoinLabel onClick={() => navigator("/join")}>
              <span>회원가입</span>
            </JoinLabel>
            <ForgetEmailBox>
              <Link to="#">
                이메일을 까먹었어요
                <AiOutlineArrowRight />
              </Link>
            </ForgetEmailBox>
            {formState.errors.extraError ? (
              <ExtraError>
                <span>{formState.errors.extraError.message}</span>
                {formState.errors.extraError.message ===
                "이메일 인증을 먼저 진행해주세요" ? (
                  <small onClick={() => receiveAgainMutate()}>
                    인증링크 다시받기
                  </small>
                ) : null}
              </ExtraError>
            ) : null}
          </Form>
          <BorderBox>
            <div className="border_div"></div>
            <span>OR</span>
            <div className="border_div"></div>
          </BorderBox>
          <KakaoLoginLink
            href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URL}&response_type=code`}
          >
            <SiKakaotalk />
            카카오톡으로 로그인
          </KakaoLoginLink>
        </>
      ) : (
        <LoginOkContainer>
          <AiOutlineCheckCircle />
          <span>
            <span>{`${watch("email")}`}</span>로 인증링크를 보냈습니다
          </span>
          <small>이메일에 보낸 인증링크를 클릭하여 로그인을 완료해주세요</small>
        </LoginOkContainer>
      )}
    </Wrapper>
  );
}
