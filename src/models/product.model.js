import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
        trim: true

    },
    description: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
        trim: true,
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },

    category: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

const Product = mongoose.model("Product", productSchema);

export default Product;