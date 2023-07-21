import express from "express";
import {
  getEmailVerification,
  getLoginEmailVerification,
  postJoin,
  postLogin,
  refreshToken,
  removeToken,
  tokenInspect,
} from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.route("/join").post(postJoin);
globalRouter.route("/email-varification").get(getEmailVerification);
globalRouter.route("/email-login-varification").get(getLoginEmailVerification);
globalRouter.route("/token-inspect").get(tokenInspect);
globalRouter.route("/refresh-token").get(refreshToken);
globalRouter.route("/remove-token").get(removeToken);
globalRouter.route("/login").post(postLogin);
export default globalRouter;
