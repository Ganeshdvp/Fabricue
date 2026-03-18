import express from 'express';
import UserAuth from '../middlewares/userAuth.js';
import getAllFavoriteItems from '../controllers/getAllFavoriteItems.js';
import toggleFavoriteItems from '../controllers/toggleFavoriteItems.js';


export const FavoriteRouter = express.Router();

// get favorite items
FavoriteRouter.get('/', UserAuth, getAllFavoriteItems);

// add and remove(toggle) favorite item
FavoriteRouter.post('/:type/:id', UserAuth, toggleFavoriteItems);