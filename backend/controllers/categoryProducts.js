import Product from '../models/Products.js';

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

     // Validate category parameter
    if (!category) {
      return res.status(400).json({ message: 'Category parameter is required' });
    }

    // Convert category to proper case (e.g., "Shirts" instead of "shirts")
    const categoryCase = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

    // Fetch products by category from the database
    const products = await Product.find({ category: categoryCase});
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    // return results
    res.json({message: 'Products retrieved successfully', data: products});

  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve products by category' });
  }
};

export default getProductsByCategory;