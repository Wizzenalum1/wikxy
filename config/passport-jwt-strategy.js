// setting up the jwt strategy
// founding the user and finding the jwt tokken




const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
// we will going to use create
const User = require("../models/user_model");

// header will have bearer key that has token data.
let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codial',
}

// this will use after creating the token and verifying the token
passport.use(new JWTStrategy(options,function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id,function(err,user){
        if(err){console.log("error in finding user",err);return;}
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
}))