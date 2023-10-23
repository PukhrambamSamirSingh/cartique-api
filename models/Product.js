const mongoose = require("mongoose")
const { Schema } = mongoose

const ProductSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    images: {
        type: [String]
    },
    gender: {
        type: String
    },
    colors: {
        type: [String]
    },
    size: {
        type: String
    },
    brand: {
        type: String
    },
    model: {
        type: String
    },
    technology: {
        type: String
    },
    sizeString: {
        type: [String],
        required: false
    },
    sizeNumber: {
        type: [[Number]],
        required: false
    },
    stocks: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    cancelPrice: {
        type: Number
    },
    cat: {
        type: String,
        required: true
    },
    sales: {
        type: Number,
        default: 0
    },
    deliveryTime: {
        type: Number,
        required: true
    },
    totalStars: {
        type: Number,
        default: 0
    },
    starNumber: {
        type: Number,
        default: 0
    },
    trending: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Product", ProductSchema)