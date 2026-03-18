import Product from "../models/Products.js";

const getAllProducts = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 40;
    const skip = (page - 1) * limit;
    const category = req.query.category || 'all';
    const subCategory = req.query.subCategory;

    if(!['all', 'men', 'women', 'kids', 'newArrivals', 'topDeals'].includes(category)){
      return res.status(400).json({ message: `${category} is not valid!` });
    };

     // Build dynamic filter
    const filter = {};

    if (category !== "all") {
      filter.category = category;
    }

    if (subCategory) {
      filter.subCategory = subCategory;
    }

    // Fetch products by category from the database
    const products = await Product.find(filter).skip(skip).limit(limit);
    if (!products) {
      return res.status(404).json({ message: "No products found"});
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
