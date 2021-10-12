const express = require("express");
const router = express.Router();
const postController = require("../../controllers/v1/posts");
const passport = require("passport");

// read the posts by paging and its limit.
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  postController.create
);
router.get("/read/", postController.read);
// any property can be updated like content likes etc
router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  postController.update
);
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  postController.destroy
);

module.exports = router;
