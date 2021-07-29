const {User,Comment,Post} = require('../models');

const express = require('express');
const passport = require('passport');
const router = express.Router();
const commentController = require('../controllers/comment_controller')

router.post('/comment-create',passport.checkAuthentication,commentController.createComment);
router.get('/destroy/:id',passport.checkAuthentication,commentController.destroy);

module.exports = router;