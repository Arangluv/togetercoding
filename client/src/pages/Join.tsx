import styled from "styled-components";
import { SiKakaotalk } from "react-icons/si";
import { useForm } from "react-hook-form";
import LoadingWindow from "../components/LoadingWindow";
import { useMutation } from "@tanstack/react-query";
import { kakaoLogin, studentJoin } from "../api/api";
import { toast } from "react-toastify";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
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
const NameLabel = styled.label`
  width: 48%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
    margin-top: 0.5vw;
    &:focus {
      outline: none;
      border-color: #c8d6e5;
    }
  }
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
    margin-top: 0.5vw;
    transition: all 0.1s ease-in-out;
    &:focus {
      outline: none;
      border-color: #c8d6e5;
    }
  }
`;
const TermsBox = styled.div`
  width: 100%;
  height: 2vw;
  margin-top: 0.5vw;
  display: flex;
`;
const TermsLabel = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  input[type="checkbox"] {
    width: 1.3vw;
    height: 1.3vw;
    &:hover {
      cursor: pointer;
    }
  }
  span {
    margin-left: 0.5vw;
    &:hover {
      cursor: pointer;
    }
    color: ${(props) => props.theme.textColor};
    a {
      color: #00aff0;
      font-weight: 600;
    }
  }
  #error_caution {
    color: ${(props) => props.theme.errorColor};
    font-size: 1vw;
    margin-left: 1vw;
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
const ExtraError = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1vw;
  span {
    color: ${(props) => props.theme.errorColor};
    font-size: 1.2vw;
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
const JoinOkContainer = styled.div`
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
  nickname: string;
  name: string;
  terms_agree: boolean;
  extraError?: string;
}
export default function Join() {
  const [joinOk, setJoinOk] = useState(false);
  const { register, formState, handleSubmit, setError, clearErrors, watch } =
    useForm<DProps>();
  const { data, mutate, isLoading } = useMutation({
    mutationFn: (joinData: DProps) => studentJoin(joinData),
    onSuccess: () => {
      toast.success("회원가입에 성공했습니다!");
      setJoinOk(true);
    },
    onError: (error: any) => {
      toast.error("회원가입중 오류가 발생했습니다");
      setError("extraError", {
        message: error?.response?.data?.message,
      });
      return;
    },
  });
  const onValid = (data: DProps) => {
    if (isLoading) {
      return;
    }
    mutate(data);
  };
  return (
    <>
      <Wrapper>
        <Title>같이코딩 회원가입</Title>
        {!joinOk ? (
          <>
            <Form onSubmit={handleSubmit(onValid)}>
              <NameInfoBox>
                <NameLabel htmlFor="nickname">
                  <span>
                    닉네임{" "}
                    {formState.errors.nickname ? (
                      <small>{formState.errors.nickname.message}</small>
                    ) : null}
                  </span>
                  <input
                    {...register("nickname", {
                      required: "닉네임을 입력해주세요",
                      minLength: {
                        value: 2,
                        message: "최소 2글자 이상입니다",
                      },
                    })}
                    onFocus={() => clearErrors("extraError")}
                    id="nickname"
                    type="text"
                  />
                </NameLabel>
                <NameLabel htmlFor="name">
                  <span>
                    이름{" "}
                    {formState.errors.name ? (
                      <small>{formState.errors.name.message}</small>
                    ) : null}
                  </span>
                  <input
                    {...register("name", {
                      required: "이름을 입력해주세요",
                      minLength: {
                        value: 2,
                        message: "최소 2글자 이상입니다",
                      },
                    })}
                    onFocus={() => clearErrors("extraError")}
                    id="name"
                    type="text"
                    placeholder="홍길동"
                  />
                </NameLabel>
              </NameInfoBox>
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
                    onFocus={() => clearErrors("extraError")}
                    id="email"
                    type="text"
                  />
                </EmailLabel>
              </NameInfoBox>
              <TermsBox>
                <TermsLabel htmlFor="terms_agree">
                  <input
                    {...register("terms_agree", {
                      required: "약관에 동의해주세요",
                    })}
                    type="checkbox"
                    id="terms_agree"
                  />
                  <span>
                    <Link to="/legal/privacy-policy">개인정보처리 방침</Link> 및{" "}
                    <Link to="/legal/terms-and-conditions">이용약관</Link>에
                    동의합니다{" "}
                  </span>
                  {formState.errors.terms_agree ? (
                    <small id="error_caution">
                      {formState.errors.terms_agree.message}
                    </small>
                  ) : null}
                </TermsLabel>
              </TermsBox>
              <SubmitLabel htmlFor="join_submit">
                <span>회원가입</span>
                <input type="submit" id="join_submit" />
              </SubmitLabel>
              {formState.errors.extraError ? (
                <ExtraError>
                  <span>{formState.errors.extraError.message}</span>
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
              카카오톡 10초 회원가입
            </KakaoLoginLink>
          </>
        ) : (
          <JoinOkContainer>
            <AiOutlineCheckCircle />
            <span>
              <span>{`${watch("email")}`}</span>로 인증링크를 보냈습니다
            </span>
            <small>
              이메일에 보낸 인증링크를 클릭하여 회원가입을 완료해주세요
            </small>
          </JoinOkContainer>
        )}
      </Wrapper>
      {isLoading ? <LoadingWindow loading={isLoading}></LoadingWindow> : null}
    </>
  );
}
