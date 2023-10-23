const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
    try {
        const usernameExists = await User.findOne({ username: req.body.username });

        if (usernameExists) {
            return res.status(409).json({ error: "Username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(req.body.password, salt);

        const newUser = await User.create({
            ...req.body,
            password: hashedPwd,
        });

        const { password, ...others } = newUser._doc;
        const data = {
            id: newUser._id,
            isAdmin: newUser.isAdmin,
        };

        const token = jwt.sign(data, process.env.JWT_SECRET);

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        }).status(201).json(others)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};


const loginUser = async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
        return res.status(401).json("Enter valid credentials")
    }
    const passwordCompare = await bcrypt.compare(req.body.password, user.password)
    if (!passwordCompare) {
        return res.status(401).json("Enter valid credentials")
    }
    const { password, ...others } = user._doc
    const data = {
        id: user._id,
        isAdmin: user.isAdmin
    }
    try {
        const token = jwt.sign(data, process.env.JWT_SECRET)
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }).status(200).json(others)
    } catch (error) {
        res.status(500).json("Something went wrong while generating the JWT token")
    }
}

const logoutUser = async (req, res) => {
    res.clearCookie("accessToken",
        {
            secure: true,
            sameSite: 'none'
        })
    res.status(200).json({ success: "Logout successful" })
}

module.exports = {
    createUser,
    loginUser,
    logoutUser
}