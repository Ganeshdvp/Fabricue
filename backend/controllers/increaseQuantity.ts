import { Request, Response } from 'express';
import Cart from '../models/Carts.js';
import mongoose from 'mongoose';

interface ReqBody {
    id: string;
    type: 'inc' | 'dec';
}

const increaseQuantity = async (req: Request<{}, {}, ReqBody>, res: Response): Promise<void> => {
     try{
        const {id, type} = req.body;
        const loggedInUser = req.user?._id;

        if (!loggedInUser) {
  res.status(401).json({ message: "Unauthorized" });
  return;
}
        
        // validate id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid cart item ID" });
            return;
        }

        if (!["inc", "dec"].includes(type)) {
            res.status(400).json({ message: "Invalid action type" });
            return;
        }

        // find cart item in db
        const cartItem  = await Cart.findOne({
            _id : id,
            userId : loggedInUser
        });
        if(!cartItem ){
            res.status(404).json({
        message: "Cart Item Not Found!",
      });
      return;
        }

        if(type === 'inc'){  
         cartItem.quantity += 1;
        }
        else if(type === 'dec'){   
         cartItem.quantity -= 1;
        }

        await cartItem.save();

      res.status(200).json({
      message: "Cart quantity updated successfully",
    });
    
      }
      catch(err){
        res.status(500).json({ message: "Failed to update quantity!" });
      }
}

export default increaseQuantity;