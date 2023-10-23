const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    profile: {
        type: String,
        required: false
    },
    desc: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("User", UserSchema)
