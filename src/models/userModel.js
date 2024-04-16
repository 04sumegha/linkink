import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Please provide an Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required."]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    address: {
        type: String
    },
    pincode: {
        type: Number
    },
    phoneNo: {
        type: Number
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User