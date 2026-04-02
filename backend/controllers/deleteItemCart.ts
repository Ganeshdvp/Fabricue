import { Request, Response } from "express";
import Cart from "../models/Carts.js";

interface Params {
  id: string;
}

const deleteItemCart = async (req: Request<Params>, res: Response): Promise<void> => {
    try{
    const { id } = req.params;

    // check product exist or not?
    const isProductExist = await Cart.findByIdAndDelete(id);
    if(!isProductExist){
      res.status(404).json({message: 'Item is not found!'});
      return;
    };

    // send response
    res.status(200).json({message: 'Successfully item removed from cart!'})

  }
  catch(err){
    res.status(500).json({ message: "Failed to remove Items!" });
  }
}

export default deleteItemCart;