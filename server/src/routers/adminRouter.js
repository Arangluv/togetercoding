import express from "express";
import {
  refreshTokenInspect,
  tokenCheck,
} from "../controllers/adminController";

const adminRouter = express.Router();

adminRouter.route("/token-check").get(tokenCheck);
adminRouter.route("/refresh-token").get(refreshTokenInspect);
export default adminRouter;
