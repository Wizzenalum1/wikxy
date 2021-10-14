const express = require("express");
const router = express.Router();
const userController = require("../../controllers/v1/users");
const passport = require("passport");

router.post("/create", userController.createUser);

router.post("/create-session", userController.createSession);
router.delete(
  "/destroy-session",
  passport.authenticate("jwt"),
  userController.destroySession
);
router.put("/update/:id", passport.authenticate("jwt"), userController.update);
router.put("/update/password/:otp", userController.updatePassword);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt"),
  userController.delete
);
module.exports = router;
