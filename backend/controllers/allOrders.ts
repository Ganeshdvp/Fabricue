import { Request, Response } from "express";
import Order from "../models/Orders.js";


const allOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const loggedInUser = req?.user;

        // validate user
        if(!loggedInUser){
          res.status(401).json({ message: "Unauthorized!" });
          return;
        }

        // fetch orders from db
        const orders = await Order.find({
            userId : loggedInUser._id
        }).populate({
            path: "items.productId",
            select: 'name discountPrice image stock'
        })
        .populate({
            path: "userId",
            select: "fullName",
        })
        .sort({createdAt : -1})

    // send response
    res.status(200).json({message: `Successfully fetch orders`, data: orders});

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch Orders!" });
  }
}

export default allOrders;