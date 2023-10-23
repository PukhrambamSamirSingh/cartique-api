const express = require("express")
const { createAddress, getAddress, updatePincode, createOrUpdateAddress } = require("../controllers/address")
const verifyToken = require("../middleware/verifyToken")
const router = express.Router()

router.post("/create", verifyToken, createOrUpdateAddress)
router.get("/get", verifyToken, getAddress)
router.put("/updatepin", verifyToken, updatePincode)

module.exports = router