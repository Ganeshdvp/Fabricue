import express, { RequestHandler, Router } from 'express';
import UserAuth from '../middlewares/userAuth.js';
import getAllFavoriteItems from '../controllers/getAllFavoriteItems.js';
import toggleFavoriteItems from '../controllers/toggleFavoriteItems.js';


export const FavoriteRouter: Router = express.Router();

// get favorite items
FavoriteRouter.get('/', UserAuth as RequestHandler, getAllFavoriteItems);

// add and remove(toggle) favorite item
FavoriteRouter.post<{type: string; id: string}>('/:type/:id', UserAuth as RequestHandler, toggleFavoriteItems);