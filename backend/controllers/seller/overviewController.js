import Order from '../../models/Orders.js';
import Product from '../../models/Products.js';

const overviewController = async (req, res) => {
  try {
    const loggedInUser = req?.user;

    // 🔥 Run all queries in parallel (performance boost)
    const [
      revenueData,
      totalOrders,
      totalProducts,
      recentOrders,
      recentProducts
    ] = await Promise.all([

      // 💰 Total Revenue (Delivered Orders Only)
      Order.aggregate([
        {
          $match: {
            status: "Delivered",
            userId: loggedInUser?._id // optional (if multi-user system)
          }
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$amount" }
          }
        }
      ]),

      // 📦 Total Orders
      Order.countDocuments({
        userId: loggedInUser?._id
      }),

      // 🛍️ Total Products
      Product.countDocuments({
        userId: loggedInUser?._id
      }),

      // 🕒 Recent Orders (latest 5)
      Order.find({ userId: loggedInUser?._id })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("id customer amount status createdAt"),

      // 🆕 Recent Products (latest 5)
      Product.find({ userId: loggedInUser?._id })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name price stock createdAt")
    ]);

    // 💰 Extract revenue safely
    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    // 📊 Final Response
    const overviewData = {
      totalRevenue,
      totalOrders,
      totalProducts,
      recentProducts,
      recentOrders
    };

    return res.status(200).json({
      message: 'Successfully fetched data!',
      data: overviewData
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Failed to fetch data!'
    });
  }
};

export default overviewController;