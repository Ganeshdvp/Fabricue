import express, { RequestHandler, Router } from "express";
import UserAuth from '../middlewares/userAuth.js';
import getAllCartItems from '../controllers/allCartItems.js';
import addItemToCart from '../controllers/addCart.js';
import deleteItemCart from '../controllers/deleteItemCart.js';
import increaseQuantity from '../controllers/increaseQuantity.js';

const CartRouter: Router = express.Router();

// get all cart items
CartRouter.get("/", UserAuth as RequestHandler, getAllCartItems);

// add items in cart
CartRouter.post('/add/:id', UserAuth as RequestHandler, addItemToCart);

// remove items in cart
CartRouter.delete('/remove/:id', UserAuth as RequestHandler, deleteItemCart);

// increase quantity
CartRouter.post('/quantity', UserAuth as RequestHandler, increaseQuantity);

export default CartRouter;
