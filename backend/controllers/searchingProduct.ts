import { Request, Response } from 'express';
import Product from "../models/Products.js";


const searchingProduct = async(req: Request, res: Response): Promise<void>=>{
   try{
     const query = req?.body?.query?.trim() as string;

     // validate
     if (!query) {
        res.status(400).json({ message: "Query is required!" });
        return;
    }

    // Sanitize to prevent regex injection
    const sanitizedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // find product in db
    const products = await Product.find({
        name : { $regex: sanitizedQuery, $options: "i" }
    });
    if(!products && !products.length){
        res.status(404).json({message: 'No products found!'})
        return;
    }

    res.status(200).json({message: 'Successfully fetch products!', data: products});

   }
   catch(err){
    res.status(500).json({message: 'Failed to fetch products!', err})
   }
}

export default searchingProduct;