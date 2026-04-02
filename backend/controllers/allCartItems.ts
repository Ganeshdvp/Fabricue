import { Request, Response } from "express";
import Cart from '../models/Carts.js';


const POPULATEFEILDS: string = "_id sellerId name brand category subCategory price discountPrice stock currency sizes colors rating numReviews description image isNewArrival isFavorite";


const getAllCartItems = async (req: Request, res: Response): Promise<void> => {
    try {
      const loggedInUser = req.user;

      // validate user
      if(!loggedInUser){
        res.status(401).json({ message: "Unauthorized!" });
        return;
      }

    // find db
    const products = await Cart.find({
      userId: loggedInUser._id,
    })
      .populate("productId", POPULATEFEILDS)
      .lean();

    if (!products) {
       res.status(404).json({ message: "Cart Items Not Found!"});
       return;
    }

    // send response
    res.status(200).json({message: `Successfully fetch cart items`, data: products});

  } catch (err) {
    res.status(400).json({ message: "Failed to fetch Items!" });
  }
}

export default getAllCartItems;