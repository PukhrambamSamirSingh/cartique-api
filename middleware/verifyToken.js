const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
    const token = req.cookies.accessToken
    if (!token) {
        return res.status(401).json("You are not authenticated")
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            return res.status(401).json("Token not valid")
        }
        req.userId = data.id
        req.isAdmin = data.isAdmin
        next()
    })
}

module.exports = verifyToken