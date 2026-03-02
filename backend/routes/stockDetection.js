import express from 'express';
import UserAuth from '../middlewares/userAuth.js';
import roleAuth from '../middlewares/roleAuth.js';
import stockDetection from '../controllers/stockDetection.js';

const stockDetectionRouter = express.Router();

// reduction of stock (-)
stockDetectionRouter.patch('/reduce/:id', UserAuth, roleAuth("admin", "user"), stockDetection);


export default stockDetectionRouter;