import { Request, Response } from 'express';
import Favorite from '../models/Favorite.js';


const getAllFavoriteItems = async (req: Request, res: Response): Promise<void> => {
    try{
        const loggedInUser = req?.user;

        // check if user is logged in
        if(!loggedInUser){
            res.status(401).json({message: 'Unauthorized!'});
            return;
        }

        // find products in db
        const products = await Favorite.find({userId : loggedInUser._id}).populate('productId');
        if(!products){
            res.status(404).json({message: 'Items is not found!'});
            return;
        }

        const data = products.map((f: any) => f.productId);

        // return response
        res.status(200).json({message: 'Successfully fetched favorite items!', data: data})
    }
    catch(err){
        res.status(500).json({message: 'Failed to fetch favorite items!'})
    }
}

export default getAllFavoriteItems;