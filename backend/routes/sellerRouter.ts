import express, { RequestHandler, Router } from 'express';
import overviewController from '../controllers/seller/overviewController.js';
import UserAuth from '../middlewares/userAuth.js';
import roleAuth from '../middlewares/roleAuth.js';
import ordersBySeller from '../controllers/seller/ordersBySeller.js';


export const sellerRouter: Router = express.Router();

// fetch overview
sellerRouter.get('/overview', UserAuth as RequestHandler, roleAuth("seller"), overviewController);

// get all orders by seller ID
sellerRouter.get('/orders', UserAuth as RequestHandler, roleAuth("seller"), ordersBySeller);