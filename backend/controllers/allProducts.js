import Product from "../models/Products.js";

const getAllProducts = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 40;
    const skip = (page - 1) * limit;

    // Retrieve products with pagination
    const products = await Product.find({}).skip(skip).limit(limit);

    // Send response with products
    res.status(200).json({ message: "Products retrieved successfully", data: products });
  
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve products" });
  }
};

export default getAllProducts;



// await Product.create({
//       name: "T-Shirt",
//       brand: "H&M",
//       category: "Men",
//       subCategory: "Skirts",
//       price: 499,
//       discountPrice: 199,
//       currency: "INR",
//       sizes: [
//         "XXL",
//       "XL",
//       "M",
//       "L"
//       ],
//       colors: [
//         "Green",
//       "Yellow",
//       "Red"
//       ],
//       stock: 20,
//       rating: 4.5,
//       numReviews: 10,
//       description: "A comfortable and stylish t-shirt made from high-quality cotton fabric. Perfect for casual wear and available in a variety of colors and sizes.",
//       image: [
//         "https://example.com/images/tshirt1.jpg",
//       "https://example.com/images/tshirt2.jpg"
//       ],
//       tags: [
//         "casual",
//       "cotton",
//       "summer"
//       ]
//     })