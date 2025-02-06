const express = require("express");
const passport = require("passport");
const router = express.Router()


const commentcontroller = require("../controllers/commentController")


router.post("/create", passport.checkAuthentication, commentcontroller.create)

// when this is not written  this error comes: Router.use() requires a middleware function but got a Object
module.exports = router;