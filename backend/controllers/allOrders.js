import Order from "../models/Orders.js";


const allOrders = async (req, res)=>{
    try {
        const loggedInUser = req?.user;

        // fetch orders from db
        const orders = await Order.find({
            userId : loggedInUser._id
        }).populate({
            path: "items.productId",
            select: 'name discountPrice image'
        })
        .sort({createdAt : -1})

    // send response
    res.status(200).json({message: `Successfully fetch orders`, data: orders});

  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch Orders!" });
  }
}

export default allOrders;