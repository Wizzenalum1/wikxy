const queue = require('../config/kue');
const commentsMailer = require('../mailer/comment_mailer');
queue.process('emails',function(job,done){
    console.log('emails worker is projcessing a job',job);
    commentsMailer.newComment(job.data);
    done();
});