import mongoose, { model } from "mongoose";

const cartSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Product'
    },
    type: {
        type: String,
        enum: ["cart", "favorite"],
        require: true
    }
}, {timestamps: true});

cartSchema.index({productId: 1});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;