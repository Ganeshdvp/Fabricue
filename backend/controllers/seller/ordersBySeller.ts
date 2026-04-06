import { Request, Response } from 'express';
import Order from "../../models/Orders.js";


const ordersBySeller = async (req: Request, res: Response): Promise<void> => {
  try {
    const loggedInUser = req.user;

    // validate authentication
    if (!loggedInUser) {
      res.status(401).json({
        message: "Unauthorized. Please log in.",
      });
      return;
    }

    // validate seller
    if (loggedInUser.role !== "seller") {
      res.status(403).json({
        message: "Access denied. Only sellers can access this resource.",
      });
      return;
    }

    // fetch orders + populate
    const orders = await Order.find({})
      .populate("items.productId", "sellerId discountPrice image name")
      .populate("userId", "fullName")
      .lean()
      .sort({createdAt : -1})

    // filter only seller items
    const filteredOrders = orders
      .map((order) => {
        const sellerItems = order.items.filter(
          (item: any) =>
            item.productId?.sellerId?.toString() ===
            loggedInUser._id.toString()
        );

        return {
          ...order,
          items: sellerItems,
        };
      })
      .filter((order) => order.items.length > 0); // remove empty orders

    res.status(200).json({
      message: "Orders fetched successfully",
      data: filteredOrders,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

export default ordersBySeller;