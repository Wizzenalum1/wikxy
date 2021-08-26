
const UserModel = require('../models/user_model');
const Post = require('../models/post')

module.exports.home = async function(req,res){
    console.log("reach home controller")
    try {
        let posts = await Post.find({}).populate('user')
                    .sort('-createdAt')
                    .populate({path:'comment',
                        populate:{
                            path:'user',
                    }});
        // console.log("***********************************************************");
        // console.log(posts)
        let users = await UserModel.find({});
        let context = {
            title:"home",
            posts:posts,
            users:users,
        };
        console.log("sending the data");
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