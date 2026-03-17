import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

// delivery address schema
const deliveryAddressSchema = mongoose.Schema({
   addressType: {
    type: String,
    required: true,
    enum: ["Home", "Office"],
  },
  landMark: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const ordersSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: {
      type: [itemSchema],
      required: true,
    },
    deliveryAddress: {
      type: deliveryAddressSchema,
      required: true
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["COD", "Online"],
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["failed", "paid", "COD"],
    },
    stripeSessionId: {
      type: String,
      sparse: true, // it will allow null also
      unique: true
    }
  },
  { timestamps: true },
);

ordersSchema.index({ userId: 1 });  // index
ordersSchema.index({ "items.productId": 1 });


const Order = mongoose.model("Order", ordersSchema);

export default Order;
