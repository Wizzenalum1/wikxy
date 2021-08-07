let passport = require('passport');
let localStrategy = require('passport-local').Strategy;

let User = require('../models/user_model')


passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback:true,
         },function(req,username, password,done){
            User.findOne({email:username}, function(err, user){
                if(err){
                    console.log('error finding email ERROR: '+err);
                    req.flash('error',err);
                    return done(err);
                }
                if(!user || user.password!=password){
                    console.log('user name or password is wrong');
                    req.flash('error',"password or user name is wrong");
                    return done(null,false);
                }
                console.log(`authentication successfull ${user.name} `);
                return done(null,user);
            });
         }  
));

passport.serializeUser(function(user,done){
    // console.log('serializing the data')
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error during finding the user Errror",err);
            return done(err);
        }
        // console.log("deserialization is done",user.name);
        return done(null,user);
    })
});
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        // console.log("useer is authenticated")
        return next();
    }
    console.log("authentication FAILED ");
    return res.redirect('/user/signin');
}
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        console.log("user is Authenticated and user is ",req.user.name)
        res.locals.user = req.user;
        return next();
        // console.log(res.locals.user);
    }
    // console.log("setAuthentication is failed because user is not loged in")
    return next();
}


module.exports = passport;