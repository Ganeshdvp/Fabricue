import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
     category: {
        type: String,
        enum : ['all', 'men', 'women', 'kids'],
        required: true,
        trim: true
    },
    subCategory: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discountPrice: {
        type: Number,
        trim: true
    },
    currency: {
        type: String,
        required: true,
        trim: true,
        default: "INR"
    },
    sizes: {
        type: [String],
        required: true,
        trim: true
    },
    colors: {
        type: [String],
        trim: true,
        required: true
    },
     stock: {
        type: Number,
        required: true,
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
        required: true,
        trim: true
    },
    image: {
        type: [String],
        required: true,
        trim: true
    },
    isNewArrival: {
        type: Boolean,
        default: false
    },
    isFavorite: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

productSchema.index({sellerId: 1});  // indexing

const Product = mongoose.model("Product", productSchema);

export default Product;