const express = require('express');
const router = express.Router();
const passport = require("passport");
const userController = require('../controllers/userController');
const user = require('../models/user');

// router.get("/",userController.getalluser)
router.get('/profile/:id',passport.checkAuthentication, userController.profile);
router.post('/update/:id', passport.checkAuthentication,userController.update);

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

// when this is not written  this error comes: Router.use() requires a middleware function but got a Object

module.exports = router;