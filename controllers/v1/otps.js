const { OTP, User } = require("../../models");
const otpMailer = require("../../mailer/otp_mailer");

module.exports.create = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(406).json({
        success: false,
        message: "user not found",
      });
    }
    await OTP.deleteMany({ user: user.id });
    const otp = await OTP.create({
      otp: parseInt(Math.random() * 10000000),
      user: user._id,
    });
    // here i am sending the mail
    let mailData = {
      userName: user.name,
      userEmail: user.email,
      otp,
    };
    otpMailer.newOTP(mailData);

    return res.status(201).json({
      otpId: otp._id,
      success: true,
      message: "OTP generated",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
