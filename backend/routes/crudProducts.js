import express from 'express';
import roleAuth from '../middlewares/roleAuth.js';
import createProduct from '../controllers/createProduct.js';
import updateProduct from '../controllers/updateProduct.js';
import deleteProduct from '../controllers/deleteProduct.js';
import UserAuth from '../middlewares/UserAuth.js';
import getSellerProducts from '../controllers/sellerProducts.js';
import cloudinary from '../utils/cloudinary.js';
import upload from '../middlewares/uploadImages.js';


export const CRUDProductsRoute = express.Router();

// Create product
CRUDProductsRoute.post('/createProduct', UserAuth, roleAuth("seller"), upload.array("images"), createProduct);

// Update product
CRUDProductsRoute.patch('/updateProduct/:id', UserAuth, roleAuth("seller"), upload.array("images"), updateProduct);

// Delete product
CRUDProductsRoute.delete('/deleteProduct/:id', UserAuth, roleAuth("seller"), deleteProduct);

// GET all products by SellerId
CRUDProductsRoute.get('/allProducts', UserAuth, roleAuth("seller"), getSellerProducts);
