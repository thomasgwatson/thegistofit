const express = require("express")
const router = express.Router()
const db = require("../../db.js")

router.get("/account", function (req, res) {
    res.send("hello")
})

module.exports = router