const { Comment, Post, Like } = require("../../models");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.postId).populate("user");
    if (!req.body.content || !post) {
      return res.status(400).json({
        error: "request is not fullfill the requirement",
      });
    }
    let comment = await Comment.create({
      content: req.body.content,
      post: req.body.postId,
      user: req.user._id,
    });
    post.comment.push(comment.id);
    await post.save();
    return res.status(201).json({
      message: "comment created successfully",
      comment: comment.content,
      commentId: comment.id,
    });
  } catch (error) {
    res.status(500).json({
      error: "server internal issue",
    });
  }
};
module.exports.update = async function (req, res) {
  try {
    // find the comment and update the content if..
    // comment is exists.
    //comment creator id and login user are same
    let comment = await Comment.findById(req.params.id);
    if (!comment || !req.body.content || req.body.content === comment.content) {
      return res.status(400).json({
        error: "request is wrong",
      });
    }
    if (req.user.id === comment.user.toString()) {
      comment.content = req.body.content;
      await comment.save();
      return res.status(201).json({
        comment: {
          id: comment.id,
          content: comment.content,
        },
        message: "comment is updated",
      });
    } else {
      return res.status(401).json({
        error: "you are unautherized",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "server internal issue",
    });
  }
};
module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(400).json({
        error: "request is wrong",
      });
    }
    let post = await Post.findById(comment.post);
    if (
      comment.user.toString() === req.user.id ||
      post.user.toString() === req.user.id
    ) {
      await Like.deleteMany({ _id: { $in: comment.likes } });
      await comment.remove();
      await Post.findByIdAndUpdate(comment, {
        $pull: { comment: req.params.id },
      });
      return res.status(200).json({
        message: "comment deleted",
      });
    } else {
      return res.status(401).json({
        error: "you are unautherized",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: "server internal issue",
    });
  }
};
