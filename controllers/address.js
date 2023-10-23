const Address = require("../models/Address")
const User = require("../models/User")

const createOrUpdateAddress = async (req, res) => {
    try {
        const existingAddress = await Address.findOne({
            userId: req.userId
        });

        if (existingAddress) {
            // Update the existing address
            existingAddress.set(req.body); // Update address details from req.body
            const updatedAddress = await existingAddress.save();
            res.status(200).json(updatedAddress);
        } else {
            // Create a new address
            const newAddress = new Address({
                userId: req.userId,
                ...req.body
            });
            const savedAddress = await newAddress.save();
            res.status(201).json(savedAddress);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


const updatePincode = async (req, res) => {
    const { pinCode } = req.body
    const userId = await User.findById(req.userId)
    try {
        const updatedPincode = await Address.findOneAndUpdate(
            { userId },
            { $set: { pinCode } },
            { new: true }
        )
        res.status(200).json(updatedPincode)
    } catch (error) {
        res.status(200).json({ error: "Internal server error" })
    }
}

const getAddress = async (req, res) => {
    try {
        const address = await Address.findOne({ userId: req.userId }).populate("userId", "-password")
        if (!address) {
            return res.status(404).json("Address not found");
        }
        res.status(200).json(address)
    } catch (error) {
        res.status(200).json({ error: error })
    }
}

module.exports = {
    createOrUpdateAddress,
    getAddress,
    updatePincode
}