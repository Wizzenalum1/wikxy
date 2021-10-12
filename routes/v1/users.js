const express = require("express");
const router = express.Router();
const userController = require("../../controllers/v1/users");
const passport = require("passport");

router.post("/create-user", userController.createUser);
router.post("/create-session", userController.createSession);
router.delete(
  "/destroy-session",
  passport.authenticate("jwt", { session: false }),
  userController.destroySession
);
module.exports = router;
