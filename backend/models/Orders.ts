import mongoose, { Model } from "mongoose";

interface ItemSchema {
  productId: mongoose.Types.ObjectId;
  size: string;
  color: string;
  quantity: number;
}

interface DeliveryAddressSchema {
  addressType: string;
  landMark: string;
  city: string;
  state: string;
  pinCode: number;
  country: string;
}

interface OrdersSchema {
  userId: mongoose.Types.ObjectId;
  items: ItemSchema[];
  deliveryAddress: DeliveryAddressSchema;
  paymentMethod: "COD" | "Online";
  paymentDate: Date;
  status: "failed" | "paid" | "COD";
  stripeSessionId?: string; // optional field for online payments
}

const itemSchema = new mongoose.Schema<ItemSchema>({
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
const deliveryAddressSchema = new mongoose.Schema<DeliveryAddressSchema>({
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

const ordersSchema = new mongoose.Schema<OrdersSchema>(
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


const Order: Model<OrdersSchema> = mongoose.model<OrdersSchema>("Order", ordersSchema);

export default Order;
