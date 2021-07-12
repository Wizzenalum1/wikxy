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
        req.flash('success','comment is created');
        return res.redirect('/');
    } catch (err) {
        req.flash('error','comment not created');
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
            req.flash('success','comment is deleted');
            return res.redirect('back');  
        }
        req.flash('error','you are not authorised');

        return res.redirect('back');
    } catch (err) {
        req.flash('error','comment not deleted');

        console.log("Error",err);
        return;
    }
}

