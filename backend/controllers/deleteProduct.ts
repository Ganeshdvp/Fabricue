import { Request, Response } from "express";
import Product from "../models/Products.js";

interface Params {
    id: string;
}

const deleteProduct = async (req: Request<Params>, res: Response): Promise<void> => {
    try{
        const {id} = req.params;
        const loggedInUser = req.user;

        if(!loggedInUser){
            res.status(401).json({ message: "Unauthorized. Please log in." });
            return;
        }

          if(loggedInUser.role !== "seller"){
            res.status(403).json({ message: "Access denied. Only sellers can access this resource." });
            return;
        }

        // find product in db
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404).json({message: "Product not found"});
            return;
        }

        // return response
        res.status(200).json({message: "Product deleted successfully"});
    }
    catch(err){
        res.status(500).json({message: "Error deleting product"});
    }
}

export default deleteProduct;