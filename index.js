const express = require("express")
const connect = require("./database")
const app = express()
const PORT = 3500
const cors = require("cors")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
const productRouter = require("./routes/product")
const reviewRouter = require("./routes/review")
const cartRouter = require("./routes/cart")
const addressRouter = require("./routes/address")
const wishlistRouter = require("./routes/wishlist")

//middleware
app.use(express.json())
app.use(cors({
    origin: "https://cartique.onrender.com",
    credentials: true
}))
dotenv.config()
connect()
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/review", reviewRouter)
app.use("/api/cart", cartRouter)
app.use("/api/wishlist", wishlistRouter)
app.use("/api/address", addressRouter)

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})