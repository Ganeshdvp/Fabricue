import Cart from '../models/Carts.js';


const POPULATEFEILDS =
  "_id sellerId name brand category subCategory price discountPrice currency sizes colors rating numReviews description image isNewArrival isFavorite";


const getAllCartItems = async (req, res)=>{
    try {
    // find db
    const products = await Cart.find({})
      .populate("productId", POPULATEFEILDS)
      .lean();

    if (!products) {
      return res.status(404).json({ message: "Cart Items Not Found!"});
    }

    // send response
    res.status(200).json({message: `Successfully fetch cart items`, data: products});

  } catch (err) {
    return res.status(400).json({ message: "Failed to fetch Items!" });
  }
}

export default getAllCartItems;