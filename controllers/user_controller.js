const UserModel = require('../models/user_model');
const passport = require('passport');

module.exports.signup = function(req,res){
    context = {
        title:"signup",
    }
    res.render('signup',context);
}

module.exports.createuser = function(req,res){
    UserModel.create(req.body,function(err, user){
        if(err){ 
            // TODO: you have to show error at ui
            console.log("while creating the user ERROR: ",err)
            res.redirect('back');
        }else{
            console.log(`user has been created and data is here: ${user}`);
        }
        res.redirect('/profile')
    });
   
}

module.exports.signin = function(req,res){
    context = {
        title:"signin",
    }
    res.render('signin',context);
}
module.exports.createSession = function(req,res){
    console.log("after cration page is redirecting");   
    return res.redirect('/');
    
}

module.exports.logout = function(req,res){
    console.log("logout is initated");
    req.logout();
    return res.redirect('/user/signin');
}

module.exports.updateProfile = function(req,res){
    if(req.user.id == req.params.id){
        UserModel.findByIdAndUpdate(req.params.id, req.body,function(err,user){
            return res.redirect('back');
        })
    }else{
        return res.status(401).send("unauthorized");
    }
}
