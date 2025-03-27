const express = require("express")
const router = express.Router()
const users_api = require("../../../controllers/api/v1/user_api")

router.post("/createsession", users_api.createsession)




module.exports = router; 