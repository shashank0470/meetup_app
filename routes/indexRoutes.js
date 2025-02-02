const express = require("express")
const router = express.Router()

const indexController = require("../controllers/indexController");
const passport = require("passport");

router.get("/", passport.checkAuthentication ,indexController.getalluser);


module.exports = router; 