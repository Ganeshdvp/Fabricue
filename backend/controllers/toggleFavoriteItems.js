import Product from "../models/Products.js";


const toggleFavoriteItems = async(req, res)=>{
    try{
        const {type, id} = req?.params;

        const isValidType = ['add','remove'].includes(type);
        if(!isValidType){
            return res.status(400).json({message: `${type} is not valid!`})
        }

        const isProductExist = await Product.findById(id);
        if(!isProductExist){
            return res.status(404).json({message: 'Product not found!'});
        }

        if(type === 'add'){
            isProductExist.isFavorite = true;
            await isProductExist.save();
        }
        if(type === 'remove'){
            isProductExist.isFavorite = false;
            await isProductExist.save();
        }

        res.status(200).json({message: `Successfully ${type} item in favorite!`});

    }
    catch(err){
        return res.status(400).json({message: `Failed to ${type} items!`});
    }
}

export default toggleFavoriteItems;