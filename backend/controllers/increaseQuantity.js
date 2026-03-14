import Cart from '../models/Carts.js';
import mongoose from 'mongoose';


const increaseQuantity = async (req, res)=>{
     try{
        const {id, type} = req?.body;
        const loggedInUser = req?.user?._id;
        
        // validate id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid cart item ID" });
        }

        if (!["inc", "dec"].includes(type)) {
            return res.status(400).json({ message: "Invalid action type" });
        }

        // find cart item in db
        const cartItem  = await Cart.findOne({
            _id : id,
            userId : loggedInUser
        });
        if(!cartItem ){
             return res.status(404).json({
        message: "Cart Item Not Found!",
      });
        }

        if(type === 'inc'){  
         cartItem.quantity += 1;
        }
        else if(type === 'dec'){   
         cartItem.quantity -= 1;
        }

        await cartItem .save();

      return res.status(200).json({
      message: "Cart quantity updated successfully",
    });
    
      }
      catch(err){
        return res.status(400).json({ message: "Failed to update quantity!" });
      }
}

export default increaseQuantity;