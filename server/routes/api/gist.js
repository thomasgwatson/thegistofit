const express = require("express")
const router = express.Router()
const db = require("../../db.js")

router.get("/gist", function (req, res) {
    db.select().from("gist")
        .then(function(data) {res.send(data)})
})

module.exports = router