import Product from "../models/Products.js";

const createProduct = async (req, res) => {
  try {
    const { name, brand, category, description, discountPrice, currency, price, subCategory, stock, numReviews, rating, sizes, colors, isNewArrival, image } = req.body;

    // Create a new product instance
    const newProduct = new Product({
      sellerId: req.user?._id,
      name,
      brand,
      category,
      description,
      discountPrice,
      currency,
      price,
      subCategory,
      stock,
      numReviews,
      rating,
      sizes,
      colors,
      isNewArrival: true,
      image
    });

    // save db
    await newProduct.save();

    // Send response
    res
      .status(200)
      .json({ message: "Product created successfully", data: newProduct });
      
  } catch (err) {
    res.status(500).json({ message: "Error creating product" });
  }
};

export default createProduct;
