import Product from "../models/Products.js";
import AISearch from '../utils/openAi.js';

const searchProduct = async (req, res)=>{
    try{
        const { search } = req?.body;

        if(!search){
            return res.status(400).json({message: 'Search Value is required!'})
        }

        // Proper case formatting
        const searchCase = search.charAt(0).toUpperCase() + search.slice(1).toLowerCase();

        // Direct DB search first (fastest)
        const products = await Product.find({subCategory : searchCase });

        //  If not found → use AI
        if(!products.length){
            // Ai Integrate
            const aiSearch = await AISearch(search);

            if(!aiSearch){
                return res.status(404).json({ message: "Something Went Wrong! Please try again later" });
            }

            // find in db
            products = await Product.find({subCategory : aiSearch.trim()});
            if(!products.length){
                return res.status(404).json({message: 'Products Not Found!'})
            };
            // send response
            return res.status(200).json({message: 'Successfully fetched products data!', data: product});
        }

        // send response
        return res.status(200).json({message: 'Successfully fetched products data!', data: products});
    }
    catch(err){
        return res.status(400).json({message: 'Failed to search product!'})
    }
}

export default searchProduct;