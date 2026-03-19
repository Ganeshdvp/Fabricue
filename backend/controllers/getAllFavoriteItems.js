import Favorite from '../models/Favorite.js';


const getAllFavoriteItems = async (req, res)=>{
    try{
        const loggedInUser = req?.user;

        // find products in db
        const products = await Favorite.find({userId : loggedInUser._id}).populate('productId');
        if(!products){
            return res.status(404).json({message: 'Items is not found!'});
        }

        const data = products.map(f => f.productId);

        // return response
        res.status(200).json({message: 'Successfully fetched favorite items!', data: data})
    }
    catch(err){
        return res.status(400).json({message: 'Failed to fetch favorite items!'})
    }
}

export default getAllFavoriteItems;