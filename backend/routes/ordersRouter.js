import express from 'express';
import UserAuth from '../middlewares/userAuth.js';
import allOrders from '../controllers/allOrders.js'

export const ordersRouter = express.Router();

// get all orders
ordersRouter.get('/', UserAuth, allOrders)