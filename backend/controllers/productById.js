import Product from '../models/Products.js';

const getProductById = async(req, res) => {
    try{
        const { id } = req.params;

        // Find in Db
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({ message: 'Product not found' });
        }

        // Return response
        res.status(200).json({ message: "Product retrieved successfully", data: product });
    }
    catch(error){
        res.status(500).json({ message: 'Failed to retrieve product details' });
    }
}

export default getProductById;