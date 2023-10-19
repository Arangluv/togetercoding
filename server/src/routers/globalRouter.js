import express from "express";
import {
  getEmailVerification,
  getLoginEmailVerification,
  postJoin,
  postKakaoLogin,
  postLogin,
  postLogout,
  postReceiveAgainEmailVerification,
  tokenInspect,
} from "../controllers/globalController";
import { notAllowLogined } from "../middleware/auth";

const globalRouter = express.Router();

globalRouter.route("/join").post(notAllowLogined, postJoin);
globalRouter.route("/email-varification").get(getEmailVerification);
globalRouter.route("/login").post(notAllowLogined, postLogin);
globalRouter.route("/email-login-varification").get(getLoginEmailVerification);
globalRouter.route("/token-inspect").get(tokenInspect);
globalRouter.route("/kakao-login").post(postKakaoLogin);
globalRouter.route("/logout").post(postLogout);
globalRouter
  .route("/receive-again-email-varification")
  .post(postReceiveAgainEmailVerification);
export default globalRouter;
