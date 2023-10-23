const mongoose = require("mongoose")

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connected to mongoDB successfully")
    } catch (error) {
        console.log("Failed to connect to db", error)
    }
}

module.exports = connect