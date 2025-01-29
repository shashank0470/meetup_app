// //what is happening here is first we find user, then the id of the user is stored in the cookie in the form of id through serialization, then the cookie is sended to the sever side and this cookie is authenticated and the user is finded again in the system, the the cookie is converted in the useable data and then sended again to the user or client side through deserialization



const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const user = require("../models/user");

passport.use(new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password"  // Add this to be explicit
    },
    async function(email, password, done) {
        try {
            const user = await User.findOne({ email: email });
            
            if (!user || user.password != password) {
                console.log("Invalid username/password");
                return done(null, false);
            }
            
            return done(null, user);
        } catch (err) {
            console.log("There is an error in finding the user ------> passport");
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

passport.checkAuthentication = async (req, res, next)=> {
    try{
        if (req.isAuthenticated()){
            return next();
        }

        return res.redirect("/user/signin")
    }
    catch(err){
        console.error("There is a error", error)
    }
}

passport.setAuthenticatedUser = async (req, res, next)=>{
    try{
        if(req.isAuthenticated()){
            res.locals.user = req.user
        }
        next()
    }
    catch(err){
        console.error("There is a error", error)
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