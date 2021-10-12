const express = require("express");
const router = express.Router();
const commentController = require("../../controllers/v1/comments");
const passport = require("passport");

// read the posts by paging and its limit.
router.post("/create", passport.authenticate("jwt"), commentController.create);
router.put(
  "/update/:id",
  passport.authenticate("jwt"),
  commentController.update
);
router.delete(
  "/delete/:id",
  passport.authenticate("jwt"),
  commentController.destroy
);

module.exports = router;
