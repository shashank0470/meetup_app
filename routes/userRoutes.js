const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// router.get("/",userController.getalluser)
router.get('/signup', userController.signup);
router.get('/signin', userController.signin);

router.post("/create", userController.create)

module.exports = router;