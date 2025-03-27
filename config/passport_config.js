// //what is happening here is first we find user, then the id of the user is stored through session in server and as cookies in browser in the form of id through serialization, then the cookie is sended to the sever side and this cookie is authenticated and the user is finded again in the system, the the cookie is converted in the useable data and then sended again to the user or client side through deserialization



const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");


passport.use(new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",  // Add this to be explicit

        // this 'passReqToCallback' option allows us to use req inside the authentication function.
        passReqToCallback: true,
    },
    //this req is used here by using passReqToCallback
    async function(req,email, password, done) {
        try {
            const user = await User.findOne({ email: email });
            
            if (!user || user.password != password) {
                req.flash("error", "error in password ");
                return done(null, false);
            }
            
            return done(null, user);
        } catch (err) {
            req.flash("error", "error in finding the user");
            return done(err);
        }
    }
));

//conveting complex data structure into format that ccan be easily understand and transmitted
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//converting the stored tramitted formate back into usable data structure
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        console.log("There is an error in finding the user ------> passport");
        return done(err);
    }
});
// This is a protection middleware that controls route access

//Middleware for Authentication Check, some feature or some routes must be accessed only by authenticated user
passport.checkAuthentication = async (req, res, next)=> {
    try{
        if (req.isAuthenticated()){
            return next(); // Allows access to the route

        }

        return res.redirect("/user/signin") // Blocks access, redirects to home
    }
    catch(err){
        console.error("There is a error", error)
    }
}

// This is an information-sharing middleware that passes user data to views

// Middleware for Making User Data Available in Views
passport.setAuthenticatedUser = async (req, res, next)=>{
    try{
        if(req.isAuthenticated()){
            //Make user data available to views through res.locals
            //this res.locals is for views or for local user and this req.user is the login user
            res.locals.user = req.user // Makes user data available in views
        }
        next()
    }
    catch(err){
        console.error("There is a error", err)
    }
}




module.exports = passport;

// const passport = require("passport");

// const LocalStrategy = require("passport-local").Strategy

// const User = require("../models/user")

// //authentication using passport
// passport.use(new LocalStrategy(
//     {
//         usernameField: "email"
//     },
//     function(email, password, done) {
//     User.findOne({ email: email }, function (err, user) {

//         if (err) {
//         console.log("There is a error in finding the user ------> passport")
//         //this done can take 2 argument, 1 for err and 1 for user or authentication is successful
//         return done(err);
//         }
//         if (!user || user.password != password) { 
//         console.log("Invalid username/password")
//         //here null is for the err means err is null and false is for the authentication and it is false becasue the useranem/password does not match
//         return done(null, false); 
//         }
        
//         return done(null, user);
//     });
//     }
// ));

// //serialzing
// passport.serializeUser(function(user,done){
//     done(null, user.id)
// });

// //deserialzing
// passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
//         if(err){
//             console.log("There is a error in finding the user ------> passport")
//         }

//         return done(null, user)
//     })
// });

// module.exports = passport;