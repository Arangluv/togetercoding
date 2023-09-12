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
  lectureId: string;
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
  })
    .then((result) => {
      return result.data;
    })
    .catch(async (error) => {
      let data = null;
      if (error.response.data.errorCode === 1) {
        await axios({
          url: `${BASE_URL}/refresh-token`,
          method: "GET",
          withCredentials: true,
        }).then((result) => {
          data = result.data;
        });
        return data;
      }
      if (error.response.data.errorCode === -1) {
        await axios({
          url: `${BASE_URL}/remove-token`,
          method: "GET",
          withCredentials: true,
        }).then(() => {
          data = {
            username: "",
            nickname: "",
            email: "",
            profileImg: "",
          };
        });
        return data;
      }
      // unknown error occur
      return {
        username: "",
        nickname: "",
        email: "",
        profileImg: "",
      };
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

export const lecturePayment = async ({ email, lectureId }: BuyLectureProps) => {
  return await axios({
    url: `${BASE_URL}/students/buy-lectures`,
    method: "POST",
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": `http://localhost:3000`,
      "Access-Control-Allow-Credentials": true,
    },
    data: {
      email,
      lectureId,
    },
  });
};

export const getUserIssue = async () => {
  return await axios({
    url: `${BASE_URL}/students/issues`,
    withCredentials: true,
  }).then((result) => result.data.issues);
};
