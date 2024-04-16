import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

const Product = mongoose.models.products || mongoose.model("products", productSchema)

export default Product