const mongoose = require("mongoose")
const { Schema } = mongoose

const AddressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    street: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    pinCode: {
        type: Number
    },
    houseNumber: {
        type: Number
    },
    phone: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model("Address", AddressSchema)