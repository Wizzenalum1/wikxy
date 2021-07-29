const express = require('express');
const passport = require('passport');
const multer = require('multer');

var upload = multer({ dest: 'assets/src/image/post/' });

const router = express.Router();
const postController = require('../controllers/post_controller')

router.post('/create-post', passport.checkAuthentication,postController.createPost);
router.get('/destroy/:id', passport.checkAuthentication, postController.destroy);

module.exports = router;