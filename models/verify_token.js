const mongoose = require("mongoose");

const verifyToken = mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

const VerifyToken = mongoose.model("VerifyToken",verifyToken);
module.exports = VerifyToken;