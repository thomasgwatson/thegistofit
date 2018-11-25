const express = require("express")
const router = express.Router()
const gistRoute = require("./gist")
const accountRoute = require("./account")

router.use("/gist", gistRoute)
router.use("/account", accountRoute)

module.exports = router