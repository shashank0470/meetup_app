const express = require("express")
const router = express.Router()
const passport = require("passport")
const posts_Api = require("../../../controllers/api/v1/posts_api")

router.get("/", posts_Api.index)

router.delete("/:id",passport.authenticate("jwt", {session: false}), posts_Api.destroy)

module.exports = router; 