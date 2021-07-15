const {User,Comment,Post} = require('../models');

module.exports.createComment = async function(req,res){
    try {
        console.log("in createin of commente");
        let post = await Post.findById(req.body.post).populate('user');
        
        let comment = await Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id });
        await post.comment.push(comment.id);
        await post.save();
        console.log(comment.id);
        let data = await {
            comment:comment.content,
            userName:post.user.name,
            postId:post.id,
            commentId:comment.id,// rememeber to replace this with comment id.
        };
        console.log(req.body.content,data);
        if(req.xhr){
            return res.status(202).json({ 
                data:data,
                error: 'message' 
            })
        }
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
            if(req.xhr){
                return res.status(202).json({ 
                    id:comment.id,
                    error: 'message' 
                })
            }
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

