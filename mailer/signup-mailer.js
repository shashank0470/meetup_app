const nodemailer = require("../config/nodemailer")

module.exports ={
    signup : async(user)=>{

        try{
            // render the mail template
            const template = nodemailer.renderTemplate({
                user: user
                // name : user.name,
                // email: user.email,
            }, "signup.ejs")

            //Sends the mail

            await nodemailer.transporter.sendMail({
                from: 'sumit0000pant@gmail.com',
                to: user.email,
                subject: "Login successfully",
                html: emailHTML || "<b>You have successfully logined</b>",
            })


        }
        catch(err){
            console.error("Error with Nodemailer:", err)
        }


        console.log("Email sent successfully");


    }
}