const express = require("express");
const router = express.Router();

router.use("/user", require("./users"));
router.use("/post", require("./posts"));
router.use("/comment", require("./comments"));
router.use("/like", require("./likes"));

module.exports = router;
