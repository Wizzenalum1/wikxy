const queue = require('../config/kue');
const otpMailer = require('../mailer/otp_mailer');
queue.process('emails',function(job,done){
    console.log(' otp emails worker is projcessing a job',job);
    otpMailer.newOTP(job.data);
    done();
});