const UserModel = require('../models/user_model');
const passport = require('passport');
const flash = require('connect-flash/lib/flash');
const path = require('path');
const fs = require('fs');
const VerifyToken = require('../models/verify_token');

const otpMailer = require('../mailer/otp_mailer');

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


// if user forget the password
module.exports.forgetPassword = function(req,res){
    let context = {title:"forget password"}
    return res.render("forget_password",context);
}
module.exports.createVerificationToken = async function(req,res){
    
    try {
        const user = await UserModel.find({"email":req.body.email});
        if(!user){
            await req.flash("error","your email is not correct");
            return res.redirect('back');
        }
        
        const token = await VerifyToken.create({
            token:parseInt(Math.random()*10000000),
            user:user[0]._id}
            )

        // here i am sending the mail
        let mailData = {
            userName:user[0].name,
            userEmail:user[0].email,
            token:token,
        }
        otpMailer.newOTP(mailData);
        // herre flash message to the screen but wont flash because http requiest wont occur
        await req.flash("success","confirm from your mail")
        console.log("req.body",req.body,user[0]._id,token);
        return res.render("verify-token",{title:"verify token",user:user,token:token._id});
    } catch (err) {
        console.log("error ocured dureing the create verifaction token",err)
        return res.redirect("back");
    }
   
}
module.exports.passwordVerification = async function(req,res){
    try {
        const token = await VerifyToken.findById(req.params.token);
        const user = await UserModel.findById(token.user);
        console.log("data",req.params.token, req.body,token,"***user**",user);
        if(req.body.password!==req.body["verify-password"]){
            await req.flash("success","password doesint match");
            return res.render("verify-token",{title:"verify token",user:user,token:token._id});
        }
        if(token.token!=req.body.otp){
            await req.flash("success","otp dont match");
            return res.render("verify-token",{title:"verify token",user:user,token:token._id});
        }
        if(req.body.password===req.body["verify-password"]&&
            token.token==req.body.otp){
            await UserModel.findByIdAndUpdate(user.id,{password:req.body.password});
            await VerifyToken.findByIdAndRemove(req.params.token);
            await req.flash("success","your password is udated successfully")

        }
        return res.redirect("/user/signin")
    } catch (err) {
        console.log("error during passport verification",err);
        return res.redirect('/user/signin')
    }   
}