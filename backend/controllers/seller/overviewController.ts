import { Request, Response } from 'express';
import Order from '../../models/Orders.js';

const overviewController = async (req: Request, res: Response): Promise<void> => {
  try {
    const loggedInUser = req?.user;

    // Check if user is logged in and has the 'seller' role
    if (!loggedInUser) {
      res.status(401).json({
        message: 'Unauthorized! Please log in to access this resource.'
      });
      return;
    }

    if (loggedInUser.role !== 'seller') {
      res.status(401).json({
        message: 'Access denied! Only sellers can access this resource.'
      });
      return;
    }
    let totalOrders = 0;


    // orders
    const orders = await Order.find({}).populate('items.productId', 'sellerId name discountPrice stock image').populate('userId', 'fullName').sort({ createdAt: -1 });
    if(!orders){
      res.status(404).json({
        message: 'No orders found!'
      });
      return;
    }

    // total Orders logic
    const totalOrdersForSeller = orders.filter(order => order.items.some(item => item.productId.sellerId.toString() === loggedInUser._id.toString()));
    totalOrders = totalOrdersForSeller.length;

    // total Products logic
    const totalProductsForSeller = orders.flatMap(order => order.items.filter(item => item.productId.sellerId.toString() === loggedInUser._id.toString()).map(item => item.productId)).length;

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
    res.status(200).json({
      message: 'Successfully fetched data!',
      totalOrders: totalOrdersForSeller.length,
      totalRevenue: totalRevenueForSeller,
      totalProducts: totalProductsForSeller,
      recentOrders: filterOrders.slice(0, 5),
      recentProducts: filterProducts,
    });

  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch data!', error: err instanceof Error ? err.message : 'Unknown error'
    });
  }
};

export default overviewController;