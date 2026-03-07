import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Product'
    },
    type: {
        type: String,
        enum: "cart",
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
        default: 1
    }
}, {timestamps: true});

cartSchema.index({productId: 1});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;