import Order from '../../models/Orders.js';

const overviewController = async (req, res) => {
  try {
    const loggedInUser = req?.user;
    if (loggedInUser.role !== 'seller') {
      return res.status(401).json({
        message: 'Access denied! Only sellers can access this resource.'
      });
    }

    let totalRevenue = 0;
    let totalProducts = 0;
    let totalOrders = 0;


    // orders
    const orders = await Order.find({}).populate('items.productId', 'sellerId name discountPrice stock image').populate('userId', 'fullName').sort({ createdAt: -1 });
    if(!orders){
      return res.status(404).json({
        message: 'No orders found!'
      });
    }

    // total Orders logic
    const totalOrdersForSeller = orders.filter(order => order.items.some(item => item.productId.sellerId.toString() === loggedInUser._id.toString()));
    totalOrders = totalOrdersForSeller.length;

    // total Products logic
    const totalProductsForSeller = orders.flatMap(order => order.items.filter(item => item.productId.sellerId.toString() === loggedInUser._id.toString()).map(item => item.productId));


    // total Revenue logic
    let totalRevenueForSeller = totalOrdersForSeller.reduce((acc, order) => {
      const orderRevenue = order.items.reduce((itemAcc, item) => {
        if (item.productId.sellerId.toString() === loggedInUser._id.toString()) {
          return itemAcc + (item.productId.discountPrice * item.quantity);
        }
        return itemAcc;
      }, 0);
      return acc + orderRevenue;
    }, 0);
    totalRevenueForSeller = Math.round((totalRevenueForSeller * 1.02) * 100) / 100;

    const filterOrders = orders.filter(order=> order.items.some(item=> item.productId.sellerId.toString() === loggedInUser._id.toString()))
    const filterProducts = orders.filter(order=> order.items.some(item=> item.productId.sellerId.toString() === loggedInUser._id.toString())).flatMap(order => order.items.map(item => item.productId)).slice(0, 5);

    // send response
    return res.status(200).json({
      message: 'Successfully fetched data!',
      totalOrders: totalOrdersForSeller.length,
      totalRevenue: totalRevenueForSeller,
      totalProducts: totalProductsForSeller.length,
      recentOrders: filterOrders.slice(0, 5),
      recentProducts: filterProducts,
    });

  } catch (err) {
    return res.status(500).json({
      message: 'Failed to fetch data!', error: err.message
    });
  }
};

export default overviewController;