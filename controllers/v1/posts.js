const { Comment, Post, User, Like } = require("../../models");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.status(201).json({
      post: {
        id: post.id,
        content: post.content,
      },
      message: "post created",
    });
  } catch (error) {
    res.status(500).json({
      error: "server internal issue",
    });
  }
};

module.exports.read = async function (req, res) {
  try {
    // finding all the posts by the time
    let posts = await Post.find({})
      .populate("user")
      .sort("-createdAt")
      .populate({
        path: "comment",
        populate: {
          path: "user",
        },
      });
    const { page, limit } = req.query;
    const posiblePages = parseInt(
      posts.length % limit == 0
        ? posts.length / limit
        : posts.length / limit + 1
    );
    //   if client ask for page that not exist.
    if (page > posiblePages) {
      return res.status(406).json({
        error: "page number is not exist",
        posiblePages: posiblePages,
        posts: [],
      });
    }
    // filtring the post data.
    let filteredPostList = [];
    let postCount = 0;
    for (
      let i = (page - 1) * limit;
      i < page * limit && i < posts.length;
      i++
    ) {
      let post = posts[i];
      let comments = post.comment.map((comment, index) => {
        return {
          likes: comment.likes.length,
          id: comment.id,
          content: comment.content,
          user: {
            name: comment.user.name,
            avatar: comment.user.avatar,
            id: comment.user.id,
          },
          updatedAt: comment.updatedAt,
        };
      });
      let filteredPost = {
        id: post.id,
        likes: post.likes.length,
        user: {
          id: post.user.id,
          name: post.user.name,
          avatar: post.user.avatar,
        },
        updatedAt: post.updatedAt,
        content: post.content,
        comments: comments,
      };
      filteredPostList.push(filteredPost);
      postCount++;
    }
    return res.status(200).json({
      message: "List of posts",
      posiblePages: posiblePages,
      postCount: postCount,
      posts: filteredPostList,
    });
  } catch (error) {
    res.status(500).json({
      error: "server internal issue",
    });
  }
};
module.exports.update = async function (req, res) {
  try {
    // find the post and update the content if..
    // post id is present in database.
    //post creator id and login user are same
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({
        error: "request is wrong",
      });
    }
    if (req.user.id === post.user.toString()) {
      post.content = req.body.content;
      await post.save();
      return res.status(201).json({
        post: {
          id: post.id,
          content: post.content,
        },
        message: "post is updated",
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
    const post = await Post.findById(req.params.id).populate({
      path: "comment",
    });
    if (!post) {
      return res.status(400).json({
        error: "request is wrong",
      });
    }
    if (post.user.toString() === req.user.id) {
      let postId = post.id;
      // creating arr of all likes that are related to this post
      likeIdArr = [...post.likes];
      for (let cLike of post.comment) {
        likeIdArr.push(...cLike.likes);
      }

      await Like.deleteMany({ _id: { $in: likeIdArr } });
      await Comment.deleteMany({ post: req.params.id });
      post.remove();
      return res.status(200).json({
        message: "post deleted",
      });
    } else {
      return res.status(401).json({
        error: "you are unautherized",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "server internal issue",
    });
  }
};
