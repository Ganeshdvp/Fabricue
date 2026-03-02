import Product from "../models/Products.js";


const stockDetection = async(req, res)=>{
     try{
            const { quantity } = req.body;
            const { id } = req.params;
            
            const product = await Product.findById(id);
            if(!product){
                return res.status(404).json({ error: 'Product not found.' });
            }
    
            if(product.stock < quantity){
                return res.status(400).json({ error: 'Insufficient stock.' });
            }
    
            product.stock = product.stock - quantity;
            await product.save();
    
            // send response
            res.status(200).json({ message: 'Stock reduced successfully.'});
    
        }
        catch(error){
            res.status(500).json({ error: 'An error occurred while reducing stock.' });
        }
}

export default stockDetection;