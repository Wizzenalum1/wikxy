const flash = require("connect-flash/lib/flash");
const {Comment,Post,User} = require("../models");

module.exports.createPost = async function(req,res){
    try {
        console.log("get to crate post",req.body);
        let post = await Post.create({content:req.body.content,user:req.user._id});
        console.log("post is created")
        let user = await User.findById(post.user);
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post,
                    user:user,
                },message:"post created"
            })
        }
        req.flash('success','post is created');
        // console.log(`creted post is ${post}`);
        return res.redirect('/');  
    } catch (error) {
        req.flash('falied','post is not created');  
        return error;     
    }
}

module.exports.destroy = function(req,res){
    console.log("start destroying post");
    Post.findById(req.params.id,function(err,post){
        // .id means converting the object id into string
        if(err){
            console.log(`find Error: ${err}`);
            flash.req('error','your post is deleted');

            return res.redirect('back');
        }
        console.log(`post is found where post.user is ${post.user} and req.user.id is ${req.user.id}`);
        if(post.user == req.user.id){
            let postId = post.id;
            
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err){
                if(err){
                    console.log("Error: ",err);
                }
                if(req.xhr){
                    console.log(`post deletion is completed`);
                    return res.status(200).json({
                        data:{
                            post_id:postId,
                        },message:"post deleted"
                    })
                }
                req.flash('success','post is deleted');
                return res.redirect('back');
            })
            
        }
        
    })
}