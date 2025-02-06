const express = require("express")
const router = express.Router()

const indexController = require("../controllers/indexController");
const passport = require("passport");

router.get("/", passport.checkAuthentication ,indexController.getalluser);


// when this is not written  this error comes: Router.use() requires a middleware function but got a Object

module.exports = router; 