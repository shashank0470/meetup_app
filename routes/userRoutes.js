const express = require('express');
const router = express.Router();
const passport = require("passport");
const userController = require('../controllers/userController');

// router.get("/",userController.getalluser)
router.get('/signup', userController.signup);
router.get('/signin', userController.signin);

router.post("/create", userController.create)

router.post("/createsession",passport.authenticate("local",{failureRedirect: "/user/signin"}),userController.createsession)

module.exports = router;