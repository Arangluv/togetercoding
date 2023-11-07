import axios from "axios";
import { BASE_URL } from "../utill/url";
// const accessToken = document.cookie
//   ? JSON.parse(decodeURIComponent(document.cookie).split("j:")[1]).accessToken
//   : "";
interface JoinData {
  email: string;
  nickname: string;
  name: string;
  terms_agree: boolean;
  extraError?: string;
}
interface LoginData {
  email: string;
}
interface KakaoLoginData {
  loginToken: string;
}
interface BuyLectureProps {
  email: string;
  lectureName: string;
}
export const studentJoin = async (data: JoinData) => {
  return axios({
    url: `${BASE_URL}/join`,
    method: "POST",
    data,
  });
};

export const loginState = async () => {
  return axios({
    url: `${BASE_URL}/token-inspect`,
    withCredentials: true,
  }).then((result) => {
    return result.data;
  });
};

export const studentLogin = async (data: LoginData) => {
  return axios({
    url: `${BASE_URL}/login`,
    method: "POST",
    withCredentials: true,
    data,
  });
};

export const kakaoLogin = async (token: KakaoLoginData) => {
  return axios({
    url: `${BASE_URL}/kakao-login`,
    method: "POST",
    data: token,
    withCredentials: true,
  }).then((result) => result.data);
};

export const studentLogout = async () => {
  return await axios({
    url: `${BASE_URL}/logout`,
    method: "POST",
    withCredentials: true,
  });
};
export const profileChange = async (data: FormData) => {
  return await axios({
    url: `${BASE_URL}/students/change-profile`,
    method: "POST",
    params: { directory: "profile_image" },
    data,
  });
};

export const getUserIssue = async () => {
  return await axios({
    url: `${BASE_URL}/students/issues`,
    method: "GET",
    withCredentials: true,
  }).then((result) => result.data.issues);
};

export const getStudenWritetNote = async () => {
  return await axios({
    url: `${BASE_URL}/students/notes`,
    method: "GET",
    withCredentials: true,
  }).then((result) => result.data.notes);
};

export const postReceiveAgainEmailVerification = async (email: string) => {
  return axios({
    url: `${BASE_URL}/receive-again-email-varification`,
    method: "POST",
    withCredentials: true,
    data: { email },
  });
};
interface PaymentDataProps {
  paymentKey: string | null;
  amount: number | null;
  orderId: string | null;
  idempotencyKey: string;
  encodingSecretKey: string;
}
export const postPaymentCheck = async ({
  orderId,
  paymentKey,
  amount,
  idempotencyKey,
  encodingSecretKey,
}: PaymentDataProps) => {
  return await axios({
    url: `${BASE_URL}/payment-check`,
    method: "POST",
    withCredentials: true,
    data: {
      orderId,
      paymentKey,
      amount,
      idempotencyKey,
      encodingSecretKey,
    },
  });
};

export const getPurchasesHistory = async () => {
  return await axios({
    url: `${BASE_URL}/students/purchase-history`,
    method: "GET",
    withCredentials: true,
  }).then((result) => result.data?.purchases);
};
