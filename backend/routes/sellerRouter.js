import express from 'express';
import overviewController from '../controllers/seller/overviewController.js';


export const sellerRouter = express.Router();

// fetch overview
sellerRouter.get('/overview', overviewController);
