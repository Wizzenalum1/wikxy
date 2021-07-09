
const UserModel = require('../models/user_model');
const Post = require('../models/post')

module.exports.home = async function(req,res){
    try {
            let posts = await Post.find({}).populate('user')
                        .populate({path:'comment',
                            populate:{
                                path:'user'
                        }});

        let users = await UserModel.find({});
        let context = {
            url:req.url,
            title:"home",
            posts:posts,
            users:users
        };
        // console.log(user);
        return res.render('home',context);
    }catch(err){
        console.log('Error',err);
        return;
    }  
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