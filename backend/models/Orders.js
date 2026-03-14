import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  size: {
    type: String,
    require: true,
  },
  color: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
    min: 1,
  },
});

const ordersSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    items: {
      type: [itemSchema],
      require: true,
    },
    paymentMethod: {
      type: String,
      require: true,
      enum: ["COD", "Online"],
    },
    paymentDate: {
      type: Date,
      require: true,
    },
    status: {
      type: String,
      require: true,
      enum: ["failed", "paid", "COD"],
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", ordersSchema);

export default Order;
