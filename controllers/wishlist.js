const Product = require("../models/Product");
const User = require("../models/User");
const WishList = require("../models/WishList");

const addToWishList = async (req, res) => {
    const productId = req.params.productId;
    const userId = req.userId;
    const product = await Product.findById(productId);

    try {
        if (!product) {
            return res.status(401).json("Product not found");
        }
        const existingItem = await WishList.findOne({ productId, userId });

        if (existingItem) {
            return res.status(401).json("Item already added to wishlist")
        } else {
            const wishListItem = await WishList.create({
                productId: product._id,
                userId: userId
            })
            res.status(200).json(wishListItem);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}
const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.id
        await WishList.deleteOne({ _id: itemId })
        res.status(200).json("Deleted successfully")
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}


const getItems = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId)
        const wishlistItems = await WishList.find({ userId: user._id }).sort({ createdAt: -1 }).populate("productId")
        res.status(200).json(wishlistItems)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {
    addToWishList,
    deleteItem,
    getItems
}

