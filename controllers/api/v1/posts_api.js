const {Comment,Post} = require('../../../models')

module.exports.index = async function(req,res){
    let posts = await Post.find({}).populate('user')
                    .sort('-createdAt')
                    .populate({path:'comment',
                        populate:{
                            path:'user'
                    }});
    return res.json(200,{
        message:"List of posts",
        posts:posts,
    })
}

module.exports.destroy = function(req,res){
    console.log("start destroying post,", req.params.id);
    Post.findById(req.params.id,function(err,post){
        if(err){
            console.log(`find Error: ${err}`);
            return res.json(500,{
                message:"internal server error"
            })
        }
        console.log(`post is found where post.user is ${post.user}`);
        if(post.user == req.user.id){

            let postId = post.id;
                
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err){
                if(err){
                    console.log("Error: ",err);
                }
                
                console.log(`post deletion is completed`);
                return res.json(200,{
                    post_id:postId,
                    message:"post deleted"
                })
            })       
        }else{
            return res.json(401,{
                message:"you cannot delete this post"
            });
        }
    })
}