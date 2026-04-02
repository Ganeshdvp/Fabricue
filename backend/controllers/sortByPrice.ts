import { Request, Response } from 'express';
import Product from "../models/Products.js";

interface Query {
    category: string;
    minVal: number;
    maxVal: number;
}

const sortByPrice = async (req: Request<{}, {}, {}, Query>, res: Response): Promise<void> => {
    try{
        const {category, minVal, maxVal} = req.query;

        if(!category){
            res.status(400).json({ message: 'Category is required'});
            return;
        }

        const categoryCase = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

        // validate minVal and maxVal
        if(isNaN(minVal) || isNaN(maxVal)){
            res.status(400).json({ message: 'minVal and maxVal must be numbers'});
            return;
        }

        // fetch products within the price range
        const products = await Product.find({
            category: categoryCase,
            price: {
                $gte: Number(minVal),
                $lte: Number(maxVal)
            }
        }).sort({ price: 1 }); // sort by price in ascending order

        if(!products || products.length === 0){
            res.status(404).json({ message: 'No products found within the specified price range'});
            return;
        }

        // return sorted products
        res.status(200).json({message: 'Successfully sorted products by price', data: products});
    }
    catch(error){
        res.status(500).json({ message: 'Error sorting products'});
    }
}

export default sortByPrice;