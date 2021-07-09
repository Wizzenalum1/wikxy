const {Comment,Post} = require("../models");

module.exports.createPost = function(req,res){
    Post.create({content:req.body.content,user:req.user._id},function(err,post){
        if(err){
            console.log(`err in creating the post ${err}`);
            return res.redirect('/');
        }
        console.log(`creted post is ${post}`);
        return res.redirect('/');
    })
}

module.exports.destroy = function(req,res){
    console.log("start destroying post");
    Post.findById(req.params.id,function(err,post){
        // .id means converting the object id into string
        if(err){
            console.log(`find Error: ${err}`);
            return res.redirect('back');
        }
        console.log(`post is found where post.user is ${post.user} and req.user.id is ${req.user.id}`);
        if(post.user == req.user.id){
            post.remove();
            console.log("here some thisn");
            Comment.deleteMany({post:req.params.id},function(err){
                if(err){
                    console.log("Error: ",err);
                }
                console.log(`post deletion is completed`);
            })
            
        }
        return res.redirect('back');
    })
}