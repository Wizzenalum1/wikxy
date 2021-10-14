const mongoose = require("mongoose");

const OTPSchema = mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const OTP = mongoose.model("OTP", OTPSchema);
module.exports = OTP;
