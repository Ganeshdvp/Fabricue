import express from 'express';
import getAllProducts from '../controllers/allProducts.js';
import getProductById from '../controllers/productById.js';
import sortByPrice from '../controllers/sortByPrice.js';
import searchProduct from '../controllers/searchProduct.js';

export const productRoute = express.Router();

// get all products with dynamic filtering
productRoute.get('/', getAllProducts);

// get single product
productRoute.get('/:id', getProductById);

// sort products by price in category wise
productRoute.post('/sort', sortByPrice);

// search product
productRoute.post('/search', searchProduct);