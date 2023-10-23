const express = require("express")
const verifyToken = require("../middleware/verifyToken")
const { createProduct, getProductsQuery, getProduct, getTrendingProducts } = require("../controllers/product")
const router = express.Router()

router.post("/create", verifyToken, createProduct)
router.get("/get/", getProductsQuery)
router.get("/getsingle/:title", getProduct)
router.get("/trending", getTrendingProducts)

module.exports = router