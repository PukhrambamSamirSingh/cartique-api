const mongoose = require("mongoose")
const { Schema } = mongoose

const CartSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    userId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    color: {
        type: String
    },
    size: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model("Cart", CartSchema)