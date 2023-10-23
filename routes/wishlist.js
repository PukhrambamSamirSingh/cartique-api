const express = require("express")
const verifyToken = require("../middleware/verifyToken")
const { addToWishList, getItems, deleteItem } = require("../controllers/wishlist")
const router = express.Router()

router.post("/:productId", verifyToken, addToWishList)
router.delete("/delete/:id", deleteItem)
router.get("/get", verifyToken, getItems)

module.exports = router