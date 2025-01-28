//what is happening here is first we find user, then the id of the user is stored in the cookie in the form of id through serialization, then the cookie is sended to the sever side and this cookie is authenticated and the user is finded again in the system, the the cookie is converted in the useable data and then sended again to the user or client side through deserialization



const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy

const User = require("../models/user")

//authentication using passport
passport.use(new LocalStrategy(
    {
        userNameField: "email"
    },
    function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {

        if (err) {
        console.log("There is a error in finding the user ------> passport")
        //this done can take 2 argument, 1 for err and 1 for user or authentication is successful
        return done(err);
        }
        if (!user || user.password != password) { 
        console.log("Invalid username/password")
        //here null is for the err means err is null and false is for the authentication and it is false becasue the useranem/password does not match
        return done(null, false); 
        }
        
        return done(null, user);
    });
    }
));

//serialzing
passport.serializeUser(function(user,done){
    done(null, user.id)
});

//deserialzing
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, done){
        if(err){
            console.log("There is a error in finding the user ------> passport")
        }

        return done(null, user)
    })
});

module.exports = passport;