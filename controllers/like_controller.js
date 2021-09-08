const {Like,User,Comment,Post} = require('../models')


module.exports.createLike = async function(req,res){
    // console.log("reacht the createLIke", req.query);
    Like.create({
        user:req.query.id,
        likeable:req.query.parent,
        onModel:req.query.model
    },(err,like)=>{
        if(err){
            console.log("during creating like ERRor",err)
            return;
        }
        // if(req.query.model = "Post"){
        //     Post.findByIdAndUpdate(req.query.parent,{})
        // }
        console.log(like);
    })
    return res.send("hello");
}

module.exports.togggleLike = async function(req,res){
    try {
        // likes/togle/?id=abcdkfakg&type=Post
        let likeable;
        let deleted = false;
        // req.user = {_id:'610938323f2af764385e8a68'};


        if(req.query.type=='Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }
        // check is like exist
        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        })
        // if a like aaready exsit then delete id 
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
        }else{
            // make a new like
            let newLike = await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        if(req.xhr){
            return res.status(200).json({
                message:"success",
                data:{
                    deleted:deleted
                }
            })
        }
        else{
            req.flash(`you liked ${req.query.type}`)
            return res.redirect("/")
        }
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message:"internal server error"
        })

    }
}

