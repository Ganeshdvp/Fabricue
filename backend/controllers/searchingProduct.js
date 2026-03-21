import Product from "../models/Products.js";

const searchingProduct = async(req, res)=>{
   try{
     const query = req?.body?.query?.trim();

     // validate
     if (!query) {
      return res.status(400).json({ message: "Query is required!" });
    }

    // Sanitize to prevent regex injection
    const sanitizedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // find product in db
    const products = await Product.find({
        name : { $regex: sanitizedQuery, $options: "i" }
    });
    if(!products && !products.length){
        return res.status(404).json({message: 'No products found!'})
    }

    res.status(200).json({message: 'Successfully fetch products!', data: products});

   }
   catch(err){
    return res.status(500).json({message: 'Failed to fetch products!', err})
   }
}

export default searchingProduct;