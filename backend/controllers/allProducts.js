import Product from "../models/Products.js";

const getAllProducts = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 24;
    const skip = (page - 1) * limit;

    // Retrieve products with pagination
    const products = await Product.find({}).skip(skip).limit(limit);

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    // Send response with products
    res.status(200).json({ message: "Products retrieved successfully", data: products, totalPages: totalPages});
  
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve products" });
  }
};

export default getAllProducts;