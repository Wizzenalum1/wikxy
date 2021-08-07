const express = require('express');
const passport = require('../config/passportLocals')
const userController = require('../controllers/user_controller');

const router = express.Router();

router.get('/signup', userController.signup);
router.post('/create-user', userController.createuser);
router.get('/signin', userController.signin);
router.post('/create-session',passport.authenticate('local',{
    failureRedirect:'/user/signin'
}), userController.createSession);
router.get('/signout', userController.logout);

router.post('/update/:id',passport.checkAuthentication,userController.updateProfile);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/signin'}),userController.createSession);
module.exports = router;