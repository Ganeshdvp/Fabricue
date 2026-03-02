import express from "express";
import UserAuth from '../middlewares/userAuth.js';
import getAllCartItems from '../controllers/allCartItems.js';
import addItemToCart from '../controllers/addCart.js';
import deleteItemCart from '../controllers/deleteItemCart.js';


const CartRouter = express.Router();

// get all cart items
CartRouter.get("/:type", UserAuth, getAllCartItems);

// add items in cart
CartRouter.post('/add/:type/:id', UserAuth, addItemToCart);


// remove cart
CartRouter.delete('/remove/:id', UserAuth, deleteItemCart);


export default CartRouter;
