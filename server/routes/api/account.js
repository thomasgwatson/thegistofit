const express = require("express")
const router = express.Router()
const db = require("../../db.js")

router.get("/", function (req, res) {
  db.select().from("account")
    .then(function(data) {res.send(data)})
})

module.exports = router