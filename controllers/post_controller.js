const flash = require("connect-flash/lib/flash");
const {Comment,Post,User,Like} = require("../models");

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

module.exports.destroy = async function(req,res){
    try {
        console.log("start destroying post");
        const post = await Post.findById(req.params.id).populate({path:"comment"});
        console.log(`post is found where post.user is ${post.user} and req.user.id is ${req.user.id}`);
        if(post.user == req.user.id){
            let postId = post.id;
            // creating arr of all likes that are related to this post
            likeIdArr = [...post.likes];
            for(let cLike of post.comment){
                likeIdArr.push(...cLike.likes)
            }

            // console.log(likeIdArr)
            await Like.deleteMany({_id:{$in:likeIdArr}})
            await Comment.deleteMany({post:req.params.id});
            post.remove();
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
        }else{
            if(req.xhr){
                return res.status(403).json({
                    message:"not allowed to delete"
                })
            }else{
                req.flash('error','you are not allowed to delete');
                return res.redirect('back');  
            }
        }
        
    } catch (err) {
        if(req.xhr){
            return res.status(500).json({
                deleted:false,
                message:"internal error is found"
            })
        }else{
            return res.redirect('back');
        }
    }
}