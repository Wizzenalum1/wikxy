const {User,Comment,Post,Like} = require('../models');
const commentMailler = require('../mailer/comment_mailer')
const commentEmailWorker = require('../workers/comment_email_worker')
const queue = require('../config/kue');
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
            commentId:comment.id,
            userEmail:post.user.email,
        };
        console.log(req.body.content,data);
        
        // adding the comment creation mail is send

        // commentMailler.newComment(data);

        // here reating job mailer
        let job = queue.create('emails',data).save(function(err){
            if(err){
                console.log('error in creating a queue',err);
                return
            }
            console.log(job.id);
        });

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
            await Like.deleteMany({_id:{$in:comment.likes}})
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

