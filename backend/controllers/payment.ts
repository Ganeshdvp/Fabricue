import { Request, Response } from 'express';
import Stripe from 'stripe';
import Product from '../models/Products.js';
import Order from '../models/Orders.js';

interface Items {
  _id: string;
  productId: string;
  quantity: number;
}

interface Reqbody {
  items: Items[];
  cancelUrl: string;
  paymentMethod: string;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
  throw new Error("Stripe secret key is not defined in environment variables");
}
const stripe = new Stripe(stripeKey);


export const payment = async (req: Request<{}, {}, Reqbody>, res: Response): Promise<void> => {
  try{
    const {items, cancelUrl, paymentMethod, deliveryAddress} = req.body;
    const loggedInUser = req.user?._id;

    // validate user
    if(!loggedInUser){
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // validate items
   if (!items || items.length === 0) {
      res.status(400).json({ message: "No items provided" });
      return;
    };

    // validate delivery address
    if (!deliveryAddress) {
      res.status(400).json({ message: "Delivery address is required" });
      return;
    }

    // COD order
     if(paymentMethod === "COD"){
       const order = new Order({
          userId: loggedInUser,
          items,
          deliveryAddress,
          paymentMethod: "COD",
          paymentDate: new Date(),
          status: "COD",
        });
        await order.save();

          // reduce stock
                await Promise.all(
                  order.items?.map(async (item: Items) => {
                    await Product.findByIdAndUpdate(item.productId, {
                      $inc: { stock: -item.quantity },
                    });
                  }),
                );

                
        res.status(200).json({message: 'Order Placed Successfully!'});
        return;
    }
    
    
    // Online payment

    // fetch products
    const products = await Product.find({
      _id: { $in: items.map(i=> i.productId) },
    });
     

    // build stripe line items
    const line_items = items.map((item) => {
      const product = products.find(
        (p: {_id: string}) => p._id.toString() === item.productId
      );
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
            images: product.image ? [product.image[0]] : [],
          },
          unit_amount: Math.round(product.discountPrice * 1.02 * 100),
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
      // store order data here so webhook can use it later
      metadata: {
        userId: loggedInUser.toString(),
        items: JSON.stringify(items),
        deliveryAddress: JSON.stringify(deliveryAddress),
      },
      payment_intent_data:{
        metadata:{
          userId : loggedInUser.toString(),
          items: JSON.stringify(items),
          deliveryAddress: JSON.stringify(deliveryAddress),
        }
      }
    });

    // return response
    res.status(200).json({url:session.url})

  }
  catch(err){
    res.status(500).json({message: 'Payment Failed!'}) 
  }
}
