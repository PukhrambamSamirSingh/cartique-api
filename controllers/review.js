const Product = require("../models/Product");
const Review = require("../models/Review");
const User = require("../models/User");

const createReview = async (req, res) => {
    if (req.isAdmin) {
        return res.status(400).send("Sellers can't create a review");
    }

    const { productId, desc, ratings } = req.body;

    // Ensure ratings are within the allowed range (1 to 5)
    if (!ratings || !Number.isInteger(ratings) || ratings < 1 || ratings > 5) {
        return res.status(400).json({ error: "Invalid ratings. Ratings should be a whole number between 1 and 5." });
    }

    const newReview = new Review({
        userId: req.userId,
        productId: productId,
        desc: desc,
        ratings: ratings
    });

    try {
        const savedReview = await newReview.save();
        await Product.findByIdAndUpdate(productId, { $inc: { totalStars: ratings, starNumber: 1 } });
        res.status(200).json(savedReview);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId }).populate("userId", "-password -email")
        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById({ _id: req.params.id })
        const user = await User.findById(req.userId)

        if (!review) {
            return res.status(401).json("Review not found")
        }
        if (review.userId.toString() !== user._id.toString()) {
            return res.status(401).json("You can only delete your review")
        }
        await Review.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ message: "Review deleted successfully" })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = {
    createReview,
    getReviews,
    deleteReview
}
