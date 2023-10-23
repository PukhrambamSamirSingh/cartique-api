const Product = require("../models/Product")

const createProduct = async (req, res) => {
    if (!req.isAdmin) {
        return res.status(401).json("Only Seller can create product")
    }
    try {
        const newProduct = new Product({
            userId: req.userId,
            ...req.body
        })
        const saveProduct = await newProduct.save()
        res.status(200).json(saveProduct)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}

const getProductsQuery = async (req, res) => {
    const q = req.query;
    const keywords = q.search ? q.search.split(" ").filter(Boolean) : [];

    const titleFilter = {
        ...(keywords.length > 0 && { title: { $in: keywords.map(keyword => new RegExp(keyword, "i")) } })
    };

    const catFilter = {
        ...(keywords.length > 0 && { cat: { $in: keywords.map(keyword => new RegExp(keyword, "i")) } })
    };

    const priceFilter = {
        // Check if both minPrice and maxPrice are provided in the query
        ...(q.minPrice && q.maxPrice && { price: { $gte: parseFloat(q.minPrice), $lte: parseFloat(q.maxPrice) } }),
        // Check if only minPrice is provided in the query
        ...(q.minPrice && !q.maxPrice && { price: { $gte: parseFloat(q.minPrice) } }),
        // Check if only maxPrice is provided in the query
        ...(q.maxPrice && !q.minPrice && { price: { $lte: parseFloat(q.maxPrice) } })
    };

    try {
        // Combine title, cat, and price filters using logical AND
        const filters = {
            $and: [
                { $or: [titleFilter, catFilter] },
                priceFilter
            ]
        };

        const results = await Product.find(filters).sort({ createdAt: -1 });

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ title: req.params.title });

        if (!product) {
            // If product is not found in the database, return a 404 response
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const getTrendingProducts = async (req, res) => {
    try {
        const trendingProducts = await Product.find({ trending: true }).sort({ createdAt: -1 });

        res.status(200).json(trendingProducts);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createProduct,
    getProductsQuery,
    getProduct,
    getTrendingProducts
}
