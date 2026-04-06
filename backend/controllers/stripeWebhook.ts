import { Request, Response } from "express";
import Order from "../models/Orders.js";
import Stripe from "stripe";
import Product from "../models/Products.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const stripeWebhook = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  // verify webhook signature
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_SIGNING_SECRETE as string,
    );
  } catch (err) {
    res.status(400).json({ message: "Webhook verification failed" });
    return;
  }

  // handle event
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // make sure payment is actually paid
        if (session.payment_status !== "paid") break;

        // prevent duplicate orders
        const existingOrder = await Order.findOne({
          stripeSessionId: session.id,
        });

        if (existingOrder) {
          break;
        }

        // save order
        const order = new Order({
          userId: session.metadata?.userId as string,
          items: JSON.parse(session.metadata?.items as string),
          deliveryAddress: JSON.parse(session.metadata?.deliveryAddress as string),
          paymentMethod: "Online",
          paymentDate: new Date(),
          status: "paid",
          stripeSessionId: session.id,
        });

        await order.save();

        // reduce stock
        await Promise.all(
          order.items?.map(async (item: any) => {
            await Product.findByIdAndUpdate(item.productId, {
              $inc: { stock: -item.quantity },
            });
          }),
        );

        break;
      }

      // User closed Stripe page / session expired
      case "checkout.session.expired": {
        const session = event.data.object;

        if (!session.metadata?.userId || !session.metadata?.items) {
          break;
        }

        const existingOrder = await Order.findOne({
          stripeSessionId: session.id,
        });
        if (existingOrder) break;

        const order = new Order({
          userId: session.metadata?.userId as string,
          items: JSON.parse(session.metadata?.items as string),
          deliveryAddress: JSON.parse(session.metadata?.deliveryAddress as string),
          paymentMethod: "Online",
          status: "failed",
          stripeSessionId: session.id,
        });

        await order.save();
        break;
      }
    }
  } catch (err) {
    // still return 200 so Stripe doesn't keep retrying
    res.status(200).json({ received: true });
  }

  // ALWAYS return 200
  res.status(200).json({ received: true });
};
