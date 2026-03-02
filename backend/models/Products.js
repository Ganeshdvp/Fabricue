import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    name: {
        type: String,
        require: true,
        trim: true
    },
    brand: {
        type: String,
        require: true,
        trim: true
    },
     category: {
        type: String,
        require: true,
        trim: true
    },
    subCategory: {
        type: String,
        require: true,
        trim: true
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },
    discountPrice: {
        type: Number,
        trim: true
    },
    currency: {
        type: String,
        require: true,
        trim: true
    },
    sizes: {
        type: [String],
        require: true,
        trim: true
    },
    colors: {
        type: [String],
        trim: true,
        require: true
    },
     stock: {
        type: Number,
        require: true,
        min: 0
    },
    rating: {
        type: Number,
        trim: true,
        default: 0
    },
    numReviews: {
        type: Number,
        trim: true,
        default: 0
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    image: {
        type: [String],
        require: true,
        trim: true
    },
    isNewArrival: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

productSchema.index({sellerId: 1});  // indexing

const Product = mongoose.model("Product", productSchema);

export default Product;