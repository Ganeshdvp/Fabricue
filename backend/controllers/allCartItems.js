import Cart from '../models/Carts.js';


const POPULATEFEILDS =
  "_id sellerId name brand category subCategory price discountPrice currency sizes colors rating numReviews description image isNewArrival";


const getAllCartItems = async (req, res)=>{
    try {
    const { type } = req.params;

    // validate type
    const isTypeValid = ["cart", "favorite"].includes(type);
    if(!isTypeValid){
        return res.status(400).json({message: `${type} is not valid!`})
    }

    // find db
    const products = await Cart.find({ type: type })
      .populate("productId", POPULATEFEILDS)
      .lean();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Cart Items Not Found!"});
    }

    // send response
    res.status(200).json({message: `Successfully fetch ${type} items`, data: products});

  } catch (err) {
    return res.status(400).json({ message: "Failed to fetch Items!" });
  }
}

export default getAllCartItems;