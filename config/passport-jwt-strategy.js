// setting up the jwt strategy
// founding the user and finding the jwt tokken

const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
// we will going to use create
const { User } = require("../models");

// header will have bearer key that has token data.
let options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "codial",
};

// this will use after creating the token and verifying the token
passport.use(
  new JWTStrategy(options, function (jwtPayLoad, done) {
    User.findById(jwtPayLoad._id, function (err, user) {
      if (err) {
        console.log("error in finding user", err);
        return;
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);
passport.serializeUser(function (user, done) {
  // console.log('serializing the data')
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("error during finding the user Errror", err);
      return done(err);
    }
    // console.log("deserialization is done",user.name);
    return done(null, user);
  });
});
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    console.log("user is Authenticated and user is ", req.user.name);
    res.locals.user = req.user;
    return next();
    // console.log(res.locals.user);
  }
  // console.log("setAuthentication is failed because user is not loged in")
  return next();
};

module.exports = passport;
