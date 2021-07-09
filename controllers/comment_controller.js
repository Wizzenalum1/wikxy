const {User,Comment,Post} = require('../models');

module.exports.createComment = async function(req,res){
    try {
        console.log("in createin of commente");
        let post = await Post.findById(req.body.post);
        let comment = await Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id });
        await post.comment.push(comment.id);
        await post.save();
        return res.redirect('/');
    } catch (err) {
        console.log("Error",err);
        return;
    }
     
}

module.exports.destroy = async function(req, res){
    try {
        let comment = await Comment.findById(req.params.id);
        let post = await Post.findById(comment.post);
        if(comment.user == req.user.id || post.user== req.user.id){
            await comment.remove();
            await Post.findByIdAndUpdate(comment,{$pull:{comment:req.params.id}});
        }
        return res.redirect('back');
    } catch (err) {
        console.log("Error",err);
        return;
    }
}

