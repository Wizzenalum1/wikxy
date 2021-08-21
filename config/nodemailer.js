const nodemailer = require("nodemailer");
const path = require('path');
const ejs = require('ejs');
let transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'ektajain986@gmail.com',
      pass: '175*Shyam', 
    },
  });

  // i allowed my mailing mail to less sequire apps after then it is able to login

  let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    console.log("get in to render templates")
    ejs.renderFile(
      path.join(__dirname,'../views/mailer',relativePath),
      data,
      function(err,template){
        if(err){console.log('error in rendring',err);return}
        console.log("mail template is created", template)
        mailHTML = template
      }
    )
    return mailHTML;
  }
  module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
  }
