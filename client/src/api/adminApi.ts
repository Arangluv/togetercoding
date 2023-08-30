import axios from "axios";
import { BASE_URL } from "../utill/url";
// const accessToken = document.cookie
//   ? JSON.parse(decodeURIComponent(document.cookie).split("j:")[1]).accessToken
//   : "";
export const adminTokenCheck = async () => {
  return axios({
    url: `${BASE_URL}/admin/token-check`,
    method: "GET",
    withCredentials: true,
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};
