const User = require("../../models/user_model");
const jwt = require("jsonwebtoken");

module.exports.createUser = function (req, res) {
  //   if(res.body.password===res.body.confirmPassword){

  //   }
  //   UserModel.find({email:res.body.email})
  UserModel.create(req.body, function (err, user) {
    if (err) {
      return res.status(500).json({
        message: "internal server error",
      });
    } else if (user) {
      return res.status(200).json({
        user: {
          name: user.name,
          id: uset.id,
        },
      });
    }
    return res.status(422).json({
      message: "invalid email or password don't match",
    });
  });
};
module.exports.createSession = async function (req, res) {
  try {
    console.log("email is ", req.body.email, "password is ", req.body.password);
    let user = await User.findOne({ email: req.body.email });
    if (!user || user.password != req.body.password) {
      return res.status(422).json({
        message: "invalid userame or password",
      });
    }
    return res.status(200).json({
      message: "sign in susccedssfull, here is you token, please keep sequrely",
      data: {
        token: jwt.sign(user.toJSON(), "codial", { expiresIn: "500000" }),
      },
    });
  } catch (err) {
    console.log(">>>>>>", err);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
module.exports.destroySession = function (req, res) {
  req.logout();
  return res.status(200).json({ message: "session is destroyed" });
};
