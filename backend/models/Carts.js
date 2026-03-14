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
    quantity: {
        type: Number,
        require: true,
        default: 1
    },
    size: {
        type: String,
        require: true,
        default: 'S'
    },
    color: {
        type: String,
        require: true,
        default: 'black'
    },
}, {timestamps: true});

cartSchema.index({productId: 1});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;