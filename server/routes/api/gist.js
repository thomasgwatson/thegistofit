const express = require("express")
const router = express.Router()
const db = require("../../db.js")

router.get("/", function (req, res) {
  db.select().from("gist")
    .then(function(data) {res.send(data)})
    // transaction that modifies several declared variables, then sends them all as a response
})

router.get("/:gistId", function(req, res){
  const gistId = req.params.gistId
  var gist, versions, versionFileIds
  db.select().from("gist").where("gist_id", gistId)
    .then((ret) => {
      gist = ret
      return db.select().from("version").where("gist_id", gistId)})
    .then((ret) => {
      versions = ret
      versionFileIds = [...versions].map((version) => version.version_id)
      return db.with("currentFileIds", (qb) => {
        qb.select("file_id").from("version_file").whereIn("version_id", versionFileIds)
      }).select()
        .from("file")
        .join("currentFileIds", {"file.file_id": "currentFileIds.file_id"})
    }).then((ret) => {
      // console.log(ret)

      res.send({gist, versions, files: ret})
    })
})

router.put("/:gistId", function(req, res){

  // taken req.body, parse out gist, version, files
  const gistId = req.params.gistId
  // build out knex transaction to perform series of inserts
})

module.exports = router