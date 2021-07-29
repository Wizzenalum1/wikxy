const UserModel = require('../models/user_model');
const passport = require('passport');
const flash = require('connect-flash/lib/flash');
const path = require('path');
const fs = require('fs');

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
            return res.redirect('back');
        }else if(user){
            console.log(`user has been created and data is here: ${user}`);
            req.flash('info', 'user is created');
            return res.redirect('/profile/user.id')
        }
        res.redirect('back');
    });
   
}

module.exports.signin = function(req,res){
    context = {
        title:"signin",
    }
    res.render('signin',context);
}
module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully');
    console.log("after cration page is redirecting");   
    return res.redirect('/');
    
}

module.exports.logout = function(req,res){
    console.log("logout is initated");
    req.flash('success','You have Logged out');
    req.logout();
    return res.redirect('/user/signin');
}

module.exports.updateProfile = async function(req,res){
    if(req.user.id == req.params.id){
        try {
            let user = await UserModel.findByIdAndUpdate(req.params.id);
            UserModel.uploadedAavatar(req,res,function(err){
                if(err){console.log("********multer ERRor")}
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar), function(err){
                            if(err){
                                console.log("error",err);
                                return err;
                            }
                            console.log('file is delted');
                        })
                    }
                   
                    // this is savingthe path of the  uploaded files
                    console.log(req.file,UserModel.avatarPath+'/'+req.file.filename)
                    user.avatar = UserModel.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
             
            
        } catch (error) {
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error','yout are not authorized');
        return res.status(401).send("unauthorized");
    }
}
