import Order from "../models/Orders.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  // verify webhook signature
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_SIGNING_SECRETE,
    );
  } catch (err) {
    return res.status(400).json({ message: "Webhook verification failed" });
  }

  // handle event
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

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
          userId: session.metadata.userId,
          items: JSON.parse(session.metadata.items),
          deliveryAddress: JSON.parse(session.metadata.deliveryAddress),
          paymentMethod: "Online",
          paymentDate: new Date(),
          status: "paid",
          stripeSessionId: session.id,
        });

        await order.save();
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
          userId: session.metadata.userId,
          items: JSON.parse(session.metadata.items),
          deliveryAddress: JSON.parse(session.metadata.deliveryAddress),
          paymentMethod: "Online",
          paymentDate: new Date(),
          status: "failed",
          stripeSessionId: session.id,
        });

        await order.save();
        break;
      }

      // Card declined / payment failed
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;

        if (!paymentIntent.metadata?.userId) {
          break;
        }

        const existingOrder = await Order.findOne({
          stripeSessionId: paymentIntent.metadata?.sessionId,
        });
        if (existingOrder) break;

        const order = new Order({
          userId: paymentIntent.metadata.userId,
          items: JSON.parse(paymentIntent.metadata.items),
          deliveryAddress: JSON.parse(paymentIntent.metadata.deliveryAddress),
          paymentMethod: "Online",
          paymentDate: new Date(),
          status: "failed",
          stripeSessionId: paymentIntent.metadata?.sessionId,
        });

        await order.save();
        break;
      }
    }
  } catch (err) {
    // still return 200 so Stripe doesn't keep retrying
    return res.status(200).json({ received: true });
  }

  res.status(200).json({ received: true });
};
