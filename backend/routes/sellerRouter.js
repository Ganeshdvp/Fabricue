import express from 'express';
import overviewController from '../controllers/seller/overviewController.js';
import UserAuth from '../middlewares/userAuth.js';
import roleAuth from '../middlewares/roleAuth.js';
import ordersBySeller from '../controllers/seller/ordersBySeller.js';


export const sellerRouter = express.Router();

// fetch overview
sellerRouter.get('/overview', UserAuth, roleAuth("seller"), overviewController);

// get all orders by seller ID
sellerRouter.get('/orders', UserAuth, roleAuth("seller"), ordersBySeller);