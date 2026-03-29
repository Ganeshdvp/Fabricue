import Product from "../models/Products.js";

const deleteProduct = async (req, res)=>{
    try{
        const {id} = req.params;
        const loggedInUser = req.user;

          if(loggedInUser.role !== "seller"){
            return res.status(403).json({ message: "Access denied. Only sellers can access this resource." });
        }

        // find product in db
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        // return response
        res.status(200).json({message: "Product deleted successfully"});
    }
    catch(err){
        res.status(500).json({message: "Error deleting product"});
    }
}

export default deleteProduct;