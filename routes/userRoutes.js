const express = require('express');
const router = express.Router();
const passport = require("passport");
const userController = require('../controllers/userController');
const user = require('../models/user');

// router.get("/",userController.getalluser)
router.get('/profile', userController.profile);
router.get('/signup', userController.signup);
router.get('/signin', userController.signin);

router.post("/create", userController.create)

//we also use middleware in thie router.post(,middleware,)
router.post("/create-session", 
    passport.authenticate("local", {
    failureRedirect: "/user/signin"
    }), 
    userController.createsession
);


router.get("/signout", userController.logOut);
module.exports = router;