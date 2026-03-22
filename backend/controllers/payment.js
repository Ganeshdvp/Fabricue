import Stripe from 'stripe';
import Product from '../models/Products.js';
import Order from '../models/Orders.js';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const payment = async (req, res)=>{
  try{
    const {items, cancelUrl, paymentMethod, deliveryAddress} = req?.body;
    const loggedInUser = req?.user?._id;

    // validate items
   if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    };

    // validate delivery address
    if (!deliveryAddress) {
      return res.status(400).json({ message: "Delivery address is required" });
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
                  order.items?.map(async (item) => {
                    await Product.findByIdAndUpdate(item.productId, {
                      $inc: { stock: -item.quantity },
                    });
                  }),
                );

                
        return res.status(200).json({message: 'Order Placed Successfully!'});
    }
    
    
    // Online payment

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
    return res.status(500).json({message: 'Payment Failed!'}) 
  }
}
