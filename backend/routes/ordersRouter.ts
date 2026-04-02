import express, { RequestHandler, Router } from 'express';
import UserAuth from '../middlewares/userAuth.js';
import allOrders from '../controllers/allOrders.js'

export const ordersRouter: Router = express.Router();

// get all orders
ordersRouter.get('/', UserAuth as RequestHandler, allOrders)