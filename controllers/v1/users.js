const {
  User,
  OTP,
  Like,
  Post,
  Comment,
  Friendship,
  Request,
} = require("../../models");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

// create the user or sign up
module.exports.createUser = async function (req, res) {
  try {
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(422).json({
        success: false,
        message: "passwords don't match",
      });
    }
    const email = await User.findOne({ email: req.body.email });
    if (email) {
      return res.status(422).json({
        success: false,
        message: "email already exits",
      });
    }
    const user = await User.create(req.body);
    if (user) {
      return res.status(201).json({
        success: true,
        user: {
          name: user.name,
          id: user.id,
          avatar: user.avatar,
        },
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "server internal error",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server internal error",
    });
  }
};

// create session or JWT token
module.exports.createSession = async function (req, res) {
  try {
    console.log("email is ", req.body.email, "password is ", req.body.password);
    let user = await User.findOne({ email: req.body.email });
    if (!user || user.password != req.body.password) {
      return res.status(422).json({
        success: false,
        message: "invalid userame or password",
      });
    }
    return res.status(200).json({
      success: true,
      message: "sign in susccedssfull, here is you token, please keep sequrely",
      token: jwt.sign(user.toJSON(), "codial", { expiresIn: "5000000" }),
      user: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

// / delte the JWT Token sessions
module.exports.destroySession = function (req, res) {
  req.logout();
  return res.status(200).json({
    success: true,
    message: "log out successfully",
  });
};

//update user name, about, and avatar. */
module.exports.update = async function (req, res) {
  try {
    if (req.user.id === req.params.id) {
      let user = await User.findById(req.params.id);
      if (!user) {
        return res.status(406).json({
          success: false,
          message: "user not found",
        });
      }
      User.uploadedAavatar(req, res, function (err) {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "file storage not working",
          });
        }
        const { name, about } = req.body;
        if (name) {
          user.name = name;
        }
        if (about) {
          user.about = about;
        }
        if (req.file) {
          if (user.avatar) {
            fs.unlinkSync(
              path.join(__dirname, "../..", user.avatar),
              function (err) {
                if (err) {
                  return res.status(500).json({
                    success: false,
                    message: "file storage not working",
                  });
                }
                user.avatar = User.avatarPath + "/" + req.file.filename;
                user.save();
                return res.status(201).json({
                  success: true,
                  message: "profile save successfully",
                });
              }
            );
          }
          user.avatar = path.join(User.avatarPath, req.file.filename);
        }
        user.save();
        return res.status(201).json({
          success: true,
          message: "profile save successfully",
        });
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "you are unautherized",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

// update password by otp...
module.exports.updatePassword = async function (req, res) {
  try {
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(422).json({
        success: false,
        message: "passwords don't match",
      });
    }
    const otp = await OTP.findById(req.params.otp);
    const user = await User.findById(otp.user);
    if (!otp || !user) {
      return res.status(422).json({
        success: false,
        message: "otp or user not found",
      });
    }
    if (otp.otp !== req.body.otp) {
      return res.status(406).json({
        success: false,
        message: "wrong otp",
      });
    }
    user.password = req.body.password;
    await otp.remove();
    await user.save();
    return res.status(201).json({
      success: true,
      message: "password changed successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

module.exports.delete = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(422).json({
        success: false,
        message: "user not found",
      });
    }
    return res.status(501).json({
      success: false,
      message: "not implemented",
    });
    // await Like.deleteMany({user:user.id});
    // await OTP.deleteMany({user:user.id});
    // await Comment.deleteMany({user:user.id});
    // await Post.deleteMany({user:user.id});
    // await Friendship.deleteMany({id:user.friends});
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
