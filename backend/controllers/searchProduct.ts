import { Request, Response } from 'express';
import Product from "../models/Products.js";
import AISearch from '../utils/openAi.js';

const searchProduct = async (req: Request, res: Response): Promise<void>=>{
    try{
        const { search } = req?.body as { search: string };

        if(!search){
            res.status(400).json({message: 'Search Value is required!'})
            return;
        }

        // Proper case formatting
        const searchCase: string = search.charAt(0).toUpperCase() + search.slice(1).toLowerCase();

        // Direct DB search first (fastest)
        let products = await Product.find({subCategory : searchCase });

        //  If not found → use AI
        if(!products.length){
            // Ai Integrate
            const aiSearch = await AISearch(search);

            if(!aiSearch){
                res.status(404).json({ message: "Something Went Wrong! Please try again later" });
                return;
            }

            // find in db
            products = await Product.find({subCategory : aiSearch});
            if(!products.length){
                res.status(404).json({message: 'Products Not Found!'})
                return;
            };
        }

        // send response
        res.status(200).json({message: 'Successfully fetched products data!', data: products});
    }
    catch(err){
        res.status(400).json({message: 'Failed to search product!'})
    }
}

export default searchProduct;