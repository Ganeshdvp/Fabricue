import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    size: {
        type: String,
        required: true,
        default: 'S'
    },
    color: {
        type: String,
        required: true,
        default: 'black'
    },
}, {timestamps: true});

// indexing
cartSchema.index({userId: 1});
cartSchema.index({productId: 1});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;