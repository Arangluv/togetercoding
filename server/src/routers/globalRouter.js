import express from "express";
import {
  getEmailVerification,
  postJoin,
} from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.route("/join").post(postJoin);
globalRouter.route("/email-varification").get(getEmailVerification);
export default globalRouter;
