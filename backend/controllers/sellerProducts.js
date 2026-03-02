import Product from "../models/Products.js";

const getSellerProducts = async (req, res) => {
  try {
    // check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const sellerId = req.user?._id;

    // fetch products from database
    const products = await Product.find({ sellerId }).populate("sellerId", "_id fullName email");

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this seller" });
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
