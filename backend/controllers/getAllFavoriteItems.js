import Product from '../models/Products.js';


const getAllFavoriteItems = async (req, res)=>{
    try{
        const products = await Product.find({isFavorite : true});
        if(!products){
            return res.status(404).json({message: 'Item is not found!'});
        }

        // return response
        res.status(200).json({message: 'Successfully fetched favorite items!', data: products})
    }
    catch(err){
        return res.status(400).json({message: 'Failed to fetch favorite items!'})
    }
}

export default getAllFavoriteItems;