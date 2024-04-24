import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    ownedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isSet: {
        type: Boolean,
        default: false
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    linkedTo: {
        type: String,
        default: process.env.DOMAIN
    },
    qrLink: {
        type: String
    },
    size: {
        type: String,
        required: true
    }
})

const Order = mongoose.models.orders || mongoose.model("orders", orderSchema)

export default Order
