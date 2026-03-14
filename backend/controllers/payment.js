import Order from "../models/Orders.js";
import Stripe from 'stripe';
import Product from '../models/Products.js';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const payment = async (req, res)=>{
  try{
    const {items, paymentDate, paymentMethod, cancelUrl} = req?.body;
    const loggedInUser = req?.user?._id;

    // validate items
   if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    // fetch products
    const products = await Product.find({
      _id: { $in: items.map(i=> i.productId) },
    });
     

    // build stripe line items
    const line_items = items.map((item) => {
      const product = products.find(
        (p) => p._id.toString() === item.productId
      );
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: product.image ? [product.image[0]] : [],
          },
          unit_amount: (product.discountPrice + product.discountPrice * 0.02) * 100,
        },
        quantity: item.quantity,
      };
    });

    // create stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: cancelUrl,
    });

    // save order
    const orderData = new Order({
      userId : loggedInUser,
      items,
      paymentMethod,
      paymentDate,
      status: 'paid'
    });

    await orderData.save();

    // return response
    res.status(200).json({message:'Successfully placed order!', url:session.url})

  }
  catch(err){
    console.log(err.message)
    return res.status(500).json({message: 'Payment Failed!'}) 
  }
}
