import { Request, Response } from 'express';
import Product from "../models/Products.js";

const getSellerProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const loggedInUser = req.user;

    // check if user is authenticated
    if (!loggedInUser) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    if (loggedInUser.role !== "seller") {
      res
        .status(403)
        .json({
          message: "Access denied. Only sellers can access this resource.",
        });
      return;
    }

    const sellerId = req.user?._id;

    // fetch products from database
    const products = await Product.find({ sellerId }).populate(
      "sellerId",
      "_id fullName email",
    );

    if (!products || products.length === 0) {
      res
        .status(404)
        .json({ message: "No products found for this seller" });
      return;
    }

    // send response
    res
      .status(200)
      .json({ message: "Products fetched successfully", data: products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export default getSellerProducts;
