import express, { RequestHandler, Router } from 'express';
import roleAuth from '../middlewares/roleAuth.js';
import createProduct from '../controllers/createProduct.js';
import updateProduct from '../controllers/updateProduct.js';
import deleteProduct from '../controllers/deleteProduct.js';
import UserAuth from '../middlewares/userAuth.js';
import getSellerProducts from '../controllers/sellerProducts.js';
import upload from '../middlewares/uploadImages.js';


export const CRUDProductsRoute: Router = express.Router();

// Create product
CRUDProductsRoute.post('/createProduct', UserAuth as RequestHandler, roleAuth("seller"), upload.array("images"), createProduct);

// Update product
CRUDProductsRoute.patch<{id: string}>('/updateProduct/:id', UserAuth as RequestHandler, roleAuth("seller"), upload.array("images"), updateProduct);

// Delete product
CRUDProductsRoute.delete<{id: string}>('/deleteProduct/:id', UserAuth as RequestHandler, roleAuth("seller"), deleteProduct);

// GET all products by SellerId
CRUDProductsRoute.get('/allProducts', UserAuth as RequestHandler, roleAuth("seller"), getSellerProducts);
