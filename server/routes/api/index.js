const express = require("express")
const router = express.Router()
const gistRoute = require("./gist")

router.use("/gist", gistRoute)

module.exports = router