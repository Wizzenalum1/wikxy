const express = require("express");
const router = express.Router();
const passport = require("passport");

const likeController = require("../../controllers/v1/like");

router.post("/toggle", passport.authenticate("jwt"), likeController.togggle);

module.exports = router;
