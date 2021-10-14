const { Like, Comment, Post } = require("../../models");

module.exports.togggle = async function (req, res) {
  try {
    // likes/togle/?id=abcdkfakg&type=Post
    let likeable;
    let liked = true;

    if (req.body.type == "Post") {
      likeable = await Post.findById(req.body.id).populate("likes");
    } else {
      likeable = await Comment.findById(req.body.id).populate("likes");
    }
    // verifing the likabel exist or provided data exist.
    if (!req.body.id || !likeable) {
      return res.status(400).json({
        error: "request is not fullfill the requirement",
      });
    }
    // check is like exist
    let existingLike = await Like.findOne({
      likeable: req.body.id,
      onModel: req.body.type,
      user: req.user._id,
    });
    // if a like aaready exsit then delete id
    if (existingLike) {
      likeable.likes.pull(existingLike._id);
      await likeable.save();
      await existingLike.remove();
      liked = false;
    } else {
      // make a new like
      let newLike = await Like.create({
        user: req.user._id,
        likeable: req.body.id,
        onModel: req.body.type,
      });
      likeable.likes.push(newLike._id);
      await likeable.save();
    }
    return res.status(201).json({
      message: "request successful",
      liked,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
