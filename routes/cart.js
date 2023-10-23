const express = require("express")
const verifyToken = require("../middleware/verifyToken")
const { addToCart, getCartItems, incrementCartItemQuantity, decrementCartItemQuantity, deleteCartItem } = require("../controllers/cart")
const router = express.Router()

router.post("/:productId", verifyToken, addToCart)
router.put("/increment/:id", incrementCartItemQuantity)
router.put("/decrement/:id", decrementCartItemQuantity)
router.delete("/delete/:id", deleteCartItem)
router.get("/get", verifyToken, getCartItems)

module.exports = router