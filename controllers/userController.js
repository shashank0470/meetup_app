const User = require('../models/user');

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
        return res.render("user_profile",{title: "Profile Page"})
    }

    catch(err){
        console.error("There is error with the profile page", err);
    }
};


module.exports.signup = async (req, res) => {
    try {
        
        if(req.isAuthenticated()){
            res.redirect("/user/profile");
        }
        return res.render('user_sign_up', {
            title: 'Signup page'
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
            res.redirect("/user/profile");
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
        return res.redirect("/user/profile")
    }
    catch(error){
        console.error("Error", error)
    }
}


module.exports.logOut = async(req, res) =>{
    try{
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
