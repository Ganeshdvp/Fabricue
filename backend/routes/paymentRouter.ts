import express, { RequestHandler, Router } from "express";
import { payment } from "../controllers/payment.js";
import UserAuth from "../middlewares/userAuth.js";


export const paymentRouter: Router = express.Router();

// stripe payment session url
paymentRouter.post('/', UserAuth as RequestHandler, payment);