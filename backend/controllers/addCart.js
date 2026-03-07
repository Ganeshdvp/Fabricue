import Product from "../models/Products.js";
import Cart from '../models/Carts.js'


const addItemToCart = async (req, res)=>{
     try{
        const {id} = req.params;
        const loggedInUser = req?.user?._id
    
        // check product exist or not?
        const isProductExist = await Product.findById(id);
        if(!isProductExist){
          return res.status(404).json({message: 'Product is not found!'});
        };

        const itemAlreadyExistInCart = await Cart.findOne({
          userId : loggedInUser,
          productId : id
        });
        if(itemAlreadyExistInCart){
          itemAlreadyExistInCart.quantity += 1;
          await itemAlreadyExistInCart.save();
          return res.status(200).json({
        message: "Cart quantity updated",
      });
        }
    
        // create item
        const product = new Cart({
          userId : loggedInUser,
          productId : id,
          type: 'cart',
        })
    
        await product.save();
    
        // send response
        res.status(200).json({message: `item is successfully added in cart`})
    
      }
      catch(err){
        return res.status(400).json({ message: "Failed to fetch Items!" });
      }
}

export default addItemToCart;