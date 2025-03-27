const express = require('express');
const router = express.Router();
const passport = require("passport");
const userController = require('../controllers/userController');

// Profile Routes
router.get('/profile/:id', 
    passport.checkAuthentication, 
    userController.profile
);

router.post('/update/:id', 
    passport.checkAuthentication, 
    userController.update
);

// Authentication Pages
router.get('/signup', userController.signup);
router.get('/signin', userController.signin);

// User Creation
router.post("/create", userController.create);

// Local Login
router.post("/create-session", 
    passport.authenticate("local", {
        failureRedirect: "/user/signin",
        failureFlash: true  // Add flash messages for login failures
    }), 
    userController.createsession
);

// Logout
router.get("/signout", userController.logOut);

// Google OAuth Routes
router.get("/auth/google", 
    passport.authenticate("google", { 
        scope: ["profile", "email"] 
    })
);

router.get("/auth/google/callback", 
    passport.authenticate("google", { 
        failureRedirect: "/user/signin",
        successRedirect: "/",
        failureFlash: true  // Add flash messages for OAuth failures
    }),
    userController.createsession
);

module.exports = router;