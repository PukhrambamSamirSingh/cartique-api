const express = require("express")
const verifyToken = require("../middleware/verifyToken")
const { getUser, setAdmin, setImage, updateUser, updatePassword } = require("../controllers/user")
const router = express.Router()

router.get("/get", verifyToken, getUser)
router.put("/setadmin", verifyToken, setAdmin)
router.put("/setimage", verifyToken, setImage)
router.put("/updateuser", verifyToken, updateUser)
router.put("/updatepassword", updatePassword)

module.exports = router