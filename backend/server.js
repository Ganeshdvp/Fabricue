import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { authRoute } from './routes/authRouter.js';
import cookieParser from 'cookie-parser';
import { productRoute } from './routes/productRouter.js';
import {CRUDProductsRoute} from './routes/crudProducts.js';
import stockDetectionRouter from './routes/stockDetection.js';
import CartRouter from './routes/cartRouter.js';
import helmet from 'helmet';
import { authLimit, productLimit, adminLimit, cartLimit, favoriteLimit, paymentLimit, orderLimit, profileLimit } from './middlewares/rateLimiting.js';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
import { FavoriteRouter } from './routes/favoriteRouter.js';
import { paymentRouter } from './routes/PaymentRouter.js';
import { ordersRouter } from './routes/ordersRouter.js';
import { profileRouter } from './routes/profileRouter.js';

// enable .env variables
dotenv.config();

// main app
const app = express();

// cors
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// headers middleware
app.use(helmet());

// if deployed it is important for rate limited
app.set("trust proxy", 1);

// global limit
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
}));

// middlewares
app.use(express.json());

// cookie read
app.use(cookieParser())

// routes
app.use('/user', /*authLimit*/ authRoute);
app.use('/profile', profileLimit, profileRouter);
app.use('/product', productLimit, productRoute);
app.use('/admin/products', adminLimit, CRUDProductsRoute);
app.use('/stock', stockDetectionRouter);
app.use('/cart', cartLimit, CartRouter);
app.use('/favorite', favoriteLimit, FavoriteRouter);
app.use('/payment', paymentLimit, paymentRouter);
app.use('/orders', orderLimit, ordersRouter);

// Database connection
connectDB().then(()=>{
    console.log("Database connected successfully!");
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
});
}).catch(err=>{
    console.log("Database connection failed", err);
})