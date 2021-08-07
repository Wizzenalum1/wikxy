const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const crypto = require('crypto')
const User = require('../models/user_model');

passport.use(new googleStrategy({
    clientID:"420707476913-5oindgp5dqkf3sr6p319abgp1oj6pj4a.apps.googleusercontent.com",
    clientSecret:"CHyPZtyeTG-N4KI4mudz_-Fp",
    callbackURL:"http://localhost:8000/user/auth/google/callback"
},
function(accessToken,refreshToken,profile,done){
  // find a user
  User.findOne({email:profile.emails[0].value}).exec(function(err,user){
    if(err) {console.log("erro in google strategy config",err);
      return;
    }
    console.log(profile);
    if(user){
      // if found, set this user as req.user
      return done(null,user);
    }else{
      // if user not found then create the users.
      User.create({
        name:profile.displayName,
        email:profile.emails[0].value,
        password:crypto.randomBytes(20).toString('hex'),
        avatar:profile.photos[0].value
      },function(err,user){
        if(err){console.log("error creating the user",err)
          return;
        }
        return done(null,user);
      })
    }
  })
}));

module.exports = passport;