const nodeMailer = require('../config/nodemailer')

exports.newOTP = (data)=>{
    let htmlString = nodeMailer.renderTemplate({data:data},'/users/otp-verify.ejs')
    
    console.log("inside newe otp mailler",htmlString,data);
    nodeMailer.transporter.sendMail({
        from:'ektajain986@gmail.com',
        to:data.userEmail,
        subject:"Hello "+data.userName,
        html:htmlString
    },(err,info)=>{
        if(err){console.log('error in sending mail',err);return}
        console.log("otp mail delivered",info);
        return;
    }) 
}