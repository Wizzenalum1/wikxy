const { Schema,model } = require("mongoose");

const likeSchema = new Schema({
    user:{
        type:Schema.ObjectId,
        required:true
    },
    // this define the obejct id od the liked object
    likeable:{
        type:Schema.ObjectId,
        required:true,
        refPath:'onModel'
    },
    // this firels for difining the type of liked oobject since this is a dynamic reference
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},
{
    timestamps:true
});


const Like = model('Like',likeSchema);
module.exports = Like;