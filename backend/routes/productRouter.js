import express from 'express';
import getAllProducts from '../controllers/allProducts.js';
import getProductById from '../controllers/productById.js';
import getProductsByCategory from '../controllers/categoryProducts.js';
import sortByPrice from '../controllers/sortByPrice.js';

export const productRoute = express.Router();

// get all products
productRoute.get('/', getAllProducts);

// get single product
productRoute.get('/:id', getProductById);

// get products by category
productRoute.get('/category/:category', getProductsByCategory);

// sort products by price in category wise
productRoute.post('/sort', sortByPrice);