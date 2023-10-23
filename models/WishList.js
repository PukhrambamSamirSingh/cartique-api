const mongoose = require("mongoose")
const { Schema } = mongoose

const WishListSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("WishList", WishListSchema)