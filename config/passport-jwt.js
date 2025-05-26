const passport = require("passport");
const JwtPassport = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

const opts = {
    //Specifies how to extract the JWT from the request (in this case, from the Authorization header as a Bearer token)
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // The secret key used to verify the JWT signature
    secretOrKey: process.env.JWT_SECRET, 
};

//This line configures Passport to use a new JWT strategy
passport.use(new JwtPassport(opts, async function(jwtPayload, done) {
    try {
        //jwtPayload is the decoded JWT content (contains user info like _id)
        const user = await User.findById(jwtPayload._id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (err) {
        console.log("Error in finding user for JWT", err);
        return done(err, false);
    }
}));

module.exports = passport;