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
      process.env.STRIPE_SIGNING_SECRETE
    );
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return res.status(400).json({ message: "Webhook verification failed" });
  }

  // handle event
  try {
    switch (event.type) {

      case "checkout.session.completed": {
        const session = event.data.object;

        // make sure payment is actually paid
        if (session.payment_status !== "paid") break;

        const userId = session.metadata.userId;
        const items = JSON.parse(session.metadata.items);

        // prevent duplicate orders
        const existingOrder = await Order.findOne({
          stripeSessionId: session.id,
        });

        if (existingOrder) {
          console.log("Duplicate webhook, order already exists");
          break;
        }

        // save order
        const order = new Order({
          userId,
          items,
          paymentMethod: "Online",
          paymentDate: new Date(),
          status: "paid",
          stripeSessionId: session.id,
        });

        await order.save();
        console.log("Order saved:", order._id);
        break;
      }

      // User closed Stripe page / session expired
      case "checkout.session.expired": {
        const session = event.data.object;

        const existingOrder = await Order.findOne({
          stripeSessionId: session.id,
        });
        if (existingOrder) break;

          if (!session.metadata?.userId || !session.metadata?.items) {
    console.log("No metadata found, skipping...");
    break;
  }

        const order = new Order({
          userId : session.metadata.userId,
          items : JSON.parse(session.metadata.items),
          paymentMethod: "Online",
          paymentDate: new Date(),
          status: "failed",
          stripeSessionId: session.id,
        });

        await order.save();
        console.log("Order saved (expired):", order._id);
        break;
      };

      // Card declined / payment failed
      case "payment_intent.payment_failed": {
        const paymentIntent  = event.data.object;

         if (!paymentIntent.metadata?.userId) {
          console.log("No metadata found, skipping...");
          break;
        }

        const existingOrder = await Order.findOne({
          stripeSessionId: paymentIntent.metadata?.sessionId,
        });
        if (existingOrder) break;

        const order = new Order({
          userId: paymentIntent.metadata.userId,
          items: JSON.parse(paymentIntent.metadata.items),
          paymentMethod: "Online",
          paymentDate: new Date(),
          status: "failed",
          stripeSessionId: paymentIntent.metadata?.sessionId,
        });

        await order.save();
        console.log("Order saved (failed):", order._id);
        break;
      }

      default:
        console.log("Unhandled event type:", event.type);
    }
  } catch (err) {
    console.error("Webhook handler error:", err.message);
    // still return 200 so Stripe doesn't keep retrying
    return res.status(200).json({ received: true });
  }

  res.status(200).json({ received: true });
};