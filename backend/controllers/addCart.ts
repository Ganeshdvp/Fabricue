import { Request, Response } from "express";
import Product from "../models/Products.js";
import Cart from '../models/Carts.js'


interface ReqBody {
  size: string;
  selectedColor: string;
  quantity: number;
}

interface Params {
  id: string;
}

const addItemToCart = async (req: Request<Params, {}, ReqBody>, res: Response): Promise<void> =>{
     try{
        const {id} = req.params;
        const {size, selectedColor, quantity} = req.body;
        const loggedInUser = req.user?._id
        
        if (!loggedInUser) {
      res.status(401).json({ message: "You are Unauthorized" });
      return;
    }
    
        // check product exist or not?
        const isProductExist = await Product.findById(id);
        if(!isProductExist){
          res.status(404).json({message: 'Product is not found!'});
          return;
        };

        const itemAlreadyExistInCart = await Cart.findOne({
          userId : loggedInUser,
          productId : id
        });

        if(itemAlreadyExistInCart){
          itemAlreadyExistInCart.quantity += quantity || 1;
          itemAlreadyExistInCart.size = size || itemAlreadyExistInCart.size;
          itemAlreadyExistInCart.color = selectedColor || itemAlreadyExistInCart.color;
          await itemAlreadyExistInCart.save();
          res.status(200).json({
        message: "Cart quantity updated",
      });
      return;
        }
    
        // create item
        const product = new Cart({
          userId : loggedInUser,
          productId : id,
          size : isProductExist.sizes[0] || size,
          color : isProductExist.colors[0] || selectedColor,
          quantity : quantity || 1
        })
    
        await product.save();
    
        // send response
        res.status(200).json({message: `item is successfully added in cart`})
    
      }
      catch(err){
        res.status(400).json({ message: "Failed to fetch Items!" });
      }
}

export default addItemToCart;