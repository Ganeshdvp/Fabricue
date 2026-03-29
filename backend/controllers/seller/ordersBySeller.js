import Order from "../../models/Orders.js";

const ordersBySeller = async (req, res) => {
  try {
    const loggedInUser = req.user;

    // validate seller
    if (loggedInUser.role !== "seller") {
      return res.status(403).json({
        message: "Access denied. Only sellers can access this resource.",
      });
    }

    // fetch orders + populate
    const orders = await Order.find({})
      .populate("items.productId", "sellerId discountPrice image name")
      .populate("userId", "fullName")
      .lean()
      .sort({createdAt : -1})

    // filter only seller items
    const filteredOrders = orders
      .map((order) => {
        const sellerItems = order.items.filter(
          (item) =>
            item.productId?.sellerId?.toString() ===
            loggedInUser._id.toString()
        );

        return {
          ...order,
          items: sellerItems,
        };
      })
      .filter((order) => order.items.length > 0); // remove empty orders

    return res.status(200).json({
      message: "Orders fetched successfully",
      data: filteredOrders,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

export default ordersBySeller;