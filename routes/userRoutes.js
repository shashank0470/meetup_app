const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// router.get("/",userController.getalluser)
router.get('/signup', userController.signup);
router.get('/signin', userController.signin);

router.post("/create", userController.create)
router.post("/create-session", userController.createsession)


module.exports = router;