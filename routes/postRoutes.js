const express = require("express");
const passport = require("passport");
const router = express.Router();

const postController = require("../controllers/postController");

router.post("/create", passport.checkAuthentication ,postController.create);

//When you define a route with :id:
// The : tells Express "what comes after this is a parameter name"
// id is the name we chose (we could use :postId, :userId, etc.)
// In your controller, you access it using req.params.id
router.post("/delete/:id",postController.destroy);

module.exports = router; 