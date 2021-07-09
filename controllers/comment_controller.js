const {User,Comment,Post} = require('../models');

module.exports.createComment = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
            },function(err,comment){
                post.comment.push(comment.id);
                post.save();
                res.redirect('/');
            })
        }
    })
    // Comment.create({content:req.body.content,user:req.user._id,post:req.body.post},
    //     function(err,comment){
    //         if(err){
    //             console.log(`during creatin comment found ERROR ${err}`);
    //             return res.redirect('back');
    //         }
    //         console.log(` comment is created ** ${comment.content}`);
    //         Post.findByIdAndUpdate(req.user.post,{$push:{comment:comment._id}}(function(err,post){
    //             if(err){
    //                 console.log(`during finding the post found ERROR: ${err}`);
    //             }
    //             console.log("successfully comment is added to post")
    //             return res.redirect('back');
    //         }) )

    //     }
    // );
    
}

module.exports.destroy = function(req, res){
    console.log('int to destroy');
    Comment.findById(req.params.id,function(err,comment){
        if(err) console.log("errorr ",err);
        let postId = comment.post;
        Post.findById(postId,function(err,post){
            if(err){
                console.log("errore searching the post ",err);
                return res.redirect('back');
            }
            if(comment.user == req.user.id){
                console.log("self comment is removed");
                comment.remove();
                Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}},function(err,post){
                })
            }else if(post.user== req.user.id){
                console.log("others comment is removed");
                comment.remove();
                Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}},function(err,post){
                })
            }
        })
        
        
        return res.redirect('back');

    })
}

