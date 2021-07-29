const express = require('express');
const homeController = require('../controllers/home_controller')

const router = express.Router();
const passport = require('../config/passportLocals');


router.get('/',homeController.home);
router.get('/profile/:id',passport.checkAuthentication,homeController.profile);
router.use('/user',require('./user_route'));
router.use('/',require('./comment_route'));
router.use('/post',require('./post_route'));
router.use('/api',require('./api'))
module.exports = router;