const express = require('express');
const passport = require('passport');

const router = express.Router();
const postController = require('../controllers/post_controller')

router.post('/create-post',passport.checkAuthentication,postController.createPost);
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);

module.exports = router;