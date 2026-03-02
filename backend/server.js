import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { authRoute } from './routes/authRouter.js';
import cookieParser from 'cookie-parser';
import { productRoute } from './routes/productRouter.js';
import {CRUDProductsRoute} from './routes/crudProducts.js';


// enable .env variables
dotenv.config();

// main app
const app = express();

// middlewares
app.use(express.json());

// cookie read
app.use(cookieParser())

// routes
app.use('/user', authRoute);
app.use('/product', productRoute);
app.use('/admin/products', CRUDProductsRoute);


// Database connection
connectDB().then(()=>{
    console.log("Database connected successfully!");
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
});
}).catch(err=>{
    console.log("Database connection failed", err);
})