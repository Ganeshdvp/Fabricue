import express from "express";
import UserAuth from '../middlewares/userAuth.js';
import getAllCartItems from '../controllers/allCartItems.js';
import addItemToCart from '../controllers/addCart.js';
import deleteItemCart from '../controllers/deleteItemCart.js';
import increaseQuantity from '../controllers/increaseQuantity.js';

const CartRouter = express.Router();

// get all cart items
CartRouter.get("/", UserAuth, getAllCartItems);

// add items in cart
CartRouter.post('/add/:id', UserAuth, addItemToCart);

// remove items in cart
CartRouter.delete('/remove/:id', UserAuth, deleteItemCart);

// increase quantity
CartRouter.post('/quantity', UserAuth, increaseQuantity)

export default CartRouter;
