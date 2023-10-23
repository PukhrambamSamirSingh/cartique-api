const User = require("../models/User")
const bcrypt = require("bcryptjs")

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const { password, ...other } = user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}

const setAdmin = async (req, res) => {
    const { isAdmin } = req.body
    try {
        const user = await User.findById(req.userId)
        if (user) {
            user.isAdmin = isAdmin
            await user.save()
            res.status(200).json({ success: "Updated Admin" })
        } else {
            res.status(400).json("User not found")
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}

const updatePassword = async (req, res) => {
    const { password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashPwd = await bcrypt.hash(password, salt)
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            user.password = hashPwd
            await user.save()
            res.status(200).json("Password updated successfully")
        } else {
            res.status(400).json("User not found")
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}

const setImage = async (req, res) => {
    const { profile } = req.body
    const user = await User.findById(req.userId)
    try {
        if (user) {
            user.profile = profile
        }
        await user.save()
        res.status(200).json({ success: "Image updated successfully" })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}

const updateUser = async (req, res) => {
    const { username, desc } = req.body
    const user = await User.findById(req.userId)
    try {
        if (user) {
            user.username = username
        }
        if (user) {
            user.desc = desc
        }
        await user.save()
        res.status(200).json({ success: "Updated successfully" })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {
    getUser,
    setImage,
    setAdmin,
    updateUser,
    updatePassword
}