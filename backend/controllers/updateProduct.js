import Product from "../models/Products.js";

const updateProduct = async (req, res) => {
    try{
            const {id} = req.params;
    
            // find product in db
            const product = await Product.findByIdAndUpdate({_id: id}, {
                    $set: req.body
            }, {new: true});
    
            if(!product){
                return res.status(404).json({message: "Product not found"});
            }
    
            await product.save();
    
            // return response
            res.status(200).json({message: "Product updated successfully"});
        }
        catch(err){
            res.status(500).json({message: "Error updating product"});
        }
}

export default updateProduct;