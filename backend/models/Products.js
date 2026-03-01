import mongoose from "mongoose";

const productSchema = mongoose.Schema({
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
        trim: true
    },
     stock: {
        type: Number,
        require: true,
        min: 0
    },
    rating: {
        type: Number,
        trim: true
    },
    numReviews: {
        type: Number,
        trim: true
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
    isFeatured: {
        type: Boolean,
    },
    isNewArrival: {
        type: Boolean,
    },
    tags: {
        type: [String],
        require: true
    }
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);

export default Product;