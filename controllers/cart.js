const Cart = require("../models/Cart")
const Product = require("../models/Product")
const User = require("../models/User")

const addToCart = async (req, res) => {
    const productId = req.params.productId;
    const userId = req.userId;
    const product = await Product.findById(productId);

    try {
        if (!product) {
            return res.status(401).json("Product not found");
        }

        const { color, size } = req.body
        const existingCartItem = await Cart.findOne({ productId, userId, color, size });

        if (existingCartItem) {
            existingCartItem.quantity += 1;
            await existingCartItem.save();
            res.status(200).json(existingCartItem);
        } else {
            const cartItem = await Cart.create({
                productId: product._id,
                userId: userId,
                color: color,
                size: size
            });
            res.status(200).json(cartItem);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


const incrementCartItemQuantity = async (req, res) => {
    try {
        const cartItemId = req.params.id;
        const cartItem = await Cart.findById({ _id: cartItemId });
        if (!cartItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        // Assuming you have a 'productId' property in the cartItem object representing the related product's ID
        const productId = cartItem.productId;

        // Find the associated product in the database
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Check if incrementing the quantity will exceed the available stock
        const requestedQuantity = cartItem.quantity + 1;
        if (requestedQuantity > product.stocks) {
            return res.status(400).json({ error: "Cannot add more items to cart. Insufficient stock." });
        }

        cartItem.quantity = requestedQuantity;
        await cartItem.save();
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


const decrementCartItemQuantity = async (req, res) => {
    try {
        const cartItemId = req.params.id;
        const cartItem = await Cart.findById({ _id: cartItemId });
        if (!cartItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            await cartItem.save();
        }
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteCartItem = async (req, res) => {
    try {
        const cartItemId = req.params.id
        await Cart.deleteOne({ _id: cartItemId })
        res.status(200).json("Deleted successfully")
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}


const getCartItems = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId)
        const cartItems = await Cart.find({ userId: user._id }).sort({ createdAt: -1 }).populate("productId")
        res.status(200).json(cartItems)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {
    addToCart,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    deleteCartItem,
    getCartItems
}