const express = require("express")
const router = express.Router()
const db = require("../../db.js")

router.get("/", function (req, res) {
  db.select().from("gist")
    .then(function(data) {res.send(data)})
})

// router.get("/gist/:gistId", function(req, res){
//   const gistId = req.params.gistId
// })

router.put("/:gistId", function(req, res){

  // taken req.body, parse out gist, version, files
  const gistId = req.params.gistId
  // build out knex transaction to perform series of inserts
})

module.exports = router