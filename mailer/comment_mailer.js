const nodeMailer = require('../config/nodemailer');

// how to format emails and design.
exports.newComment = (data)=>{
    let htmlString = nodeMailer.renderTemplate({data:data},'/comments/new_comments.ejs');
    console.log('inside new comment mailer',htmlString)
    nodeMailer.transporter.sendMail({
        from:'ektajain986@gmail.com',
        to:data.userEmail,
        subject:"Hello "+data.userName,
        html:htmlString
    },(err,info)=>{
        if(err){console.log('error in sending mail',err);return}
        console.log("mail delivered",info);
        return;
    })
}

