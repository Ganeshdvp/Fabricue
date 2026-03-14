import express from "express";
import { payment } from "../controllers/payment.js";
import UserAuth from "../middlewares/userAuth.js";

export const paymentRouter = express.Router();

paymentRouter.post('/', UserAuth, payment)