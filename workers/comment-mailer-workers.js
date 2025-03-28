const Queue = require("../config/kue")
const comment_mailer = require("../mailer/comments-mailer")

Queue.process("emails", function(job, done){
    console.log("Email worker are doing there job", job.data);

    comment_mailer.comments_mail(job.data);

    done();
})