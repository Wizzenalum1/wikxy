const User = require("../../../models/user_model")
const jwt = require('jsonwebtoken')

module.exports.createSession = async function(req,res){
    try{
        console.log("email is ",req.body.email,"password is ",req.body.password)
        let user = await User.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:"invalid userame or password"
            });
        }
        return res.json(200,{
            message:"sign in susccedssfull, here is you token, please keep sequrely",
            data:{
                token:jwt.sign(user.toJSON(),'codial',{expiresIn:'500000'})
            }
        })
    }catch(err){
        console.log('>>>>>>',err);
        return res.json(500,{
            message:"internal server error"
        })
    }   
}