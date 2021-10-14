const { Schema, model } = require("mongoose");

const requestSchema = new Schema(
  {
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Request = model("Request", requestSchema);
module.exports = Request;
