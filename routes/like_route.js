const express = require('express');
const router = express.Router();
const passport = require('passport');

const likeController = require('../controllers/like_controller')

router.get('/add',likeController.createLike);
router.get('/toggle',likeController.togggleLike);

module.exports = router;