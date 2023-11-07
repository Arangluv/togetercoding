import express from "express";
import {
  getPaymentStatus,
  refreshTokenInspect,
  tokenCheck,
} from "../controllers/adminController";

const adminRouter = express.Router();

adminRouter.route("/token-check").get(tokenCheck);
adminRouter.route("/refresh-token").get(refreshTokenInspect);
adminRouter.route("/payment-status").get(getPaymentStatus);
export default adminRouter;
