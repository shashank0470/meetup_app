const nodemailer = require("../config/nodemailer")

module.exports = {
    comments_mail: async (comment) => {
        try {
            console.log("Nodemailer start")
            
            // Render the email template
            const emailHTML = await nodemailer.renderTemplate({
                user: comment.user,
                comment: comment
            }, 'comments.ejs');

            // Send the email
            await nodemailer.transporter.sendMail({
                from: 'sumit0000pant@gmail.com',
                to: comment.user.email,
                subject: "New Comment Notification",
                html: emailHTML || "<b>Your comment is successfully posted</b>",
            });
            
            console.log("Email sent successfully");
        }
        catch(err) {
            console.error("Error with Nodemailer:", err)
        }
    }
};