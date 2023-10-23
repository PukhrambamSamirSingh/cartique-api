const express = require("express")
const verifyToken = require("../middleware/verifyToken")
const { createReview, getReviews, deleteReview } = require("../controllers/review")
const router = express.Router()

router.post("/create", verifyToken, createReview)
router.get("/get/:productId", getReviews)
router.delete("/delete/:id", verifyToken, deleteReview)

module.exports = router