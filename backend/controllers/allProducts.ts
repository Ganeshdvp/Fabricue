import { Request, Response } from "express";
import Product from "../models/Products.js";


interface Query {
  page: string;
  limit: string;
  category: "all" | "men" | "women" | "kids";
  subCategory?: string;
}


const getAllProducts = async (req: Request<{}, {}, {}, Query>, res: Response): Promise<void> => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 40;
    const skip: number = (page - 1) * limit;
    const category = req.query.category || 'all';
    const subCategory = req.query.subCategory;

    // validate category
    if(!['all', 'men', 'women', 'kids', 'newArrivals', 'topDeals'].includes(category)){
      res.status(400).json({ message: `${category} is not valid!` });
      return;
    };

     // Build dynamic filter
    const filter: { category?: string; subCategory?: string } = {};

    if (category !== "all") {
      filter.category = category;
    }

    if (subCategory) {
      filter.subCategory = subCategory;
    }

    // Fetch products by category from the database
    const products = await Product.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
    if (!products) {
       res.status(404).json({ message: "No products found"});
       return;
    }

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    // Send response with products
    res
      .status(200)
      .json({
        message: "Products retrieved successfully",
        data: products,
        totalPages: totalPages,
      });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve products" });
  }
};

export default getAllProducts;
