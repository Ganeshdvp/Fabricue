import Cart from "../models/Carts.js";

const deleteItemCart = async (req, res)=>{
    try{
    const { id } = req.params;

    // check product exist or not?
    const isProductExist = await Cart.findByIdAndDelete(id);
    if(!isProductExist){
      return res.status(404).json({message: 'Item is not found!'});
    };

    // send response
    res.status(200).json({message: 'Successfully item removed from cart!'})

  }
  catch(err){
    return res.status(400).json({ message: "Failed to remove Items!" });
  }
}

export default deleteItemCart;