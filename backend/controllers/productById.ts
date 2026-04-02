import { Request, Response } from 'express';
import Product from '../models/Products.js';

interface Params {
    id: string;
}

const getProductById = async(req: Request<Params>, res: Response): Promise<void> => {
    try{
        const { id } = req.params;

        // Find in Db
        const product = await Product.findById(id);
        if(!product){
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        // Return response
        res.status(200).json({ message: "Product retrieved successfully", data: product });
    }
    catch(error){
        res.status(500).json({ message: 'Failed to retrieve product details' });
        return;
    }
}

export default getProductById;