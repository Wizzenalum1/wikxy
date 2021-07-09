const UserModel = require('../models/user_model');
const Post = require('../models/post')

module.exports.home = function(req,res){
   UserModel.find(function(err,users){
        if(err){
            console.log("***####***"+"there is an error to exxecceing ",err);
            return err;
        }
        Post.find()
                .populate('user')
                    .populate({path:'comment',
                        populate:{
                            path:'user'
                    }
                })
                .exec(function(err,post){
            if(err){
                console.log("***####***"+"there is an error to exxecceing ",err);
            }
            console.log(`total posts are  ** ${post.length}`);
            let context = {
                url:req.url,
                title:"home",
                posts:post,
                users:users
            };
            // console.log(user);
            return res.render('home',context);
        });
    });
}

module.exports.profile = function(req,res){
    UserModel.findById(req.params.id,function(err, user){
        console.log(req.user,res.locals.user);
        let context = {
        url:req.url,
        title:"profile",
        profile_user:user,
    };
    // console.log("***####***"+user.name+" is looking into his profile");
    return res.render('user-profile',context);
    })
    
        
}