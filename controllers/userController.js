const user = require('../models/user');
const User = require('../models/user');
const fs = require("fs");
const nodemailer = require("../config/nodemailer")
const signupMailer = require("../mailer/signup-mailer")

// module.exports.getalluser = async(req, res) =>{
//     try{
//         return res.render("index",{title: "main page"})
//     }
//     catch(error){
//         console.error("There is a error with main page", error)
//         return res.status(500).send("There is a error with main page")
//     }
// };
module.exports.profile = async (req, res)=>{
    try{
        const user_name = await User.findById(req.params.id);

        if(user_name){
            //********both title and hero should be inside the same object passed to res.render()**********//
            return res.render("user_profile",{title: "Profile Page",
                profile_data: user_name,
                //this is important to use beacuse we are using the user deatils in the profie ejs file and without this it wont be possible
                user: req.user
            })
        }
        else{
            return res.status(404).send('User not found');

        }
    }

    catch(err){
        console.error("There is error with the profile page", err);
    }
};


module.exports.signup = async (req, res) => {
    try {
        
        if(req.isAuthenticated()){
            res.redirect("/");
        }
        return res.render('user_sign_up', {
            title: 'Signup page',
        });
        
        
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).send('The signup page is not working');
    }
};

module.exports.signin = async (req, res) => {
    try {
        //isAuthenticated : Returns true if the user is authenticated/logged in
        if(req.isAuthenticated()){
            res.redirect("/");
        }
        return res.render('user_sign_in', {
            title: 'Signin page'
        });
    } catch (error) {
        console.error('Signin error:', error);
        return res.status(500).send('The signin page is not working');
    }
};


module.exports.create = async (req, res) => {
    try {
        // Check if the passwords match - note the lowercase field names
        if (req.body.password !== req.body.CPassword) {

            return res.redirect('back');
        }

        // Check if the user already exists - note the lowercase email
        const existingUser = await User.findOne({ email: req.body.email });
        
        if (!existingUser) {
            // Create a new user with the correct field names
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            await signupMailer.signup(user);
            
            return res.redirect('/user/signin');
        } else {
            console.log('User already exists with this email.');
            return res.redirect('back');
        }
    } catch (error) {
        console.error('Creation error:', error);
        return res.status(500).send('There is a creating error');
    }
};


module.exports.createsession = async(req, res)=>{
    try{
        req.flash("success", "login successfully")
        return res.redirect("/")
    }
    catch(error){
        console.error("Error", error)
    }
}


module.exports.logOut = async(req, res) =>{
    try{

        req.flash("success", "logout successfully")

        req.logout((err)=>{
            if(err){
                console.log("There is a error",err)
            }
        })
        

        return res.redirect("/")

    }
    catch(err){
        console.error("There is a error in logging out", err)
    }
};


module.exports.update = async (req, res) => {
    try {
        if (req.user.id == req.params.id) {
            // Find the user first
            let user = await User.findById(req.params.id);

            if (!user) {
                console.log("User not found");
                return res.redirect("back");
            }

            // Upload avatar if a file is provided
            User.uploadedAvatar(req, res, async function (err) {
                if (err) {
                    console.log("**** Multer error:", err);
                    return res.redirect("back");
                }

                // Update user data
                user.name = req.body.name;
                user.email = req.body.email;

                // If a new avatar is uploaded, update the avatar path
                if (req.file) {
                    user.avatar = User.Avatar_Path + "/" + req.file.filename;
                }

                // Save the updated user
                await user.save();

                return res.redirect("back");
            });
        }
    } catch (err) {
        console.error("There is an error with the update of the user", err);
    }
};
