const passport = require("passport")
const googleStrategy = require("passport-google-oauth20").Strategy
const crypto = require("crypto")
const User = require("../models/user")
require('dotenv').config();


passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/user/auth/google/callback"
},
async function(accessToken, refreshToken, profile, done) {
    try {
        // Use findOne with async/await instead of .exec()
        const user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
            // If found, return the user
            return done(null, user);
        } else {
            // Create a new user
            const newUser = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });

            return done(null, newUser);
        }
    } catch (err) {
        console.log("Error in Google OAuth Strategy:", err);
        return done(err);
    }
}));


module.exports = passport;
