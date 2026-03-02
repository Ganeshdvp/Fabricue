import Product from "../models/Products.js";
import Cart from '../models/Carts.js'


const addItemToCart = async (req, res)=>{
     try{
        const {type, id} = req.params;
    
        // check product exist or not?
        const isProductExist = await Product.findById(id);
        if(!isProductExist){
          return res.status(404).json({message: 'Product is not found!'});
        }
    
        // create item
        const product = new Cart({
          productId : id,
          type: type
        })
    
        await product.save();
    
        // send response
        res.status(200).json({message: `item is successfully added in ${type}`})
    
      }
      catch(err){
        return res.status(400).json({ message: "Failed to fetch Items!" });
      }
}

export default addItemToCart;