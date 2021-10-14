const express = require("express");
const router = express.Router();
const otpController = require("../../controllers/v1/otps");

router.post("/create", otpController.create);
module.exports = router;
