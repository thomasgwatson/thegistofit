const express = require("express")
const router = express.Router()
const Promise = require("bluebird")
const db = require("../../db.js")

router.get("/", function (req, res) {
  db.select().from("gist")
    .then(function(data) {res.send(data)})
})

router.get("/:gistId", function(req, res){
  const gistId = req.params.gistId
  var gist, versions, versionFileIds
  db.select().from("gist").where("gist_id", gistId)
    .then((ret) => {
      gist = ret
      return db.select().from("version").where("gist_id", gistId)
    }).then((ret) => {
      versions = ret
      versionFileIds = [...versions].map((version) => version.version_id)
      return db.with("currentFileIds", (qb) => {
        qb.select("file_id").from("version_file").whereIn("version_id", versionFileIds)
      }).select()
        .from("file")
        .join("currentFileIds", {"file.file_id": "currentFileIds.file_id"})
    }).then((ret) => {
      res.send({gist, versions, files: ret})
    })
})

router.put("/:gistId", function(req, res){
  // take req.body, parse out gist, version, files
  const {gist, version, files} = req.body
  // console.log(gist, version, files)
  db.transaction(function(trx){
    return trx
      .raw(`
        INSERT INTO gist (gist_id, account_id)
        VALUES (?, ?)
        ON CONFLICT DO NOTHING
        `, [gist.gist_id, gist.account_id])
      .then(() => {
        // console.log(`version insert ${version.version_id}`)
        return trx
          .raw(`
              INSERT INTO version (version_id, gist_id, title)
              VALUES (?, ?, ?)
              ON CONFLICT DO NOTHING
            `, [version.version_id, gist.gist_id, version.title])
      })
      .then(() => {
        return Promise.map(files, (file) => {
          // console.log(`file insert ${file.file_id}`)
          return trx
            .raw(`
              INSERT INTO file (file_id, langauge, file_name, content)
              VALUES (?, ?, ?, ?)
              ON CONFLICT DO NOTHING
            `, [file.file_id, file.langauge, file.file_name, file.content])
        })
      })
      .then(() => {
        return Promise.map(files, (file) => {
          // console.log(`version_file insert ${file.file_id}`)
          return trx
            .raw(`
              INSERT INTO version_file (version_id, file_id)
              VALUES (?, ?)
              ON CONFLICT DO NOTHING
            `, [version.version_id, file.file_id])
        })
      })
  })
    .then(()=>{
      res.sendStatus(200)
    })
    .catch((error) =>{
      console.error(error)
    })
  // build out knex transaction to perform series of inserts
  // 1) insert gist, or ignore if it exists
  // 2) insert version, or ignore if it exists
  // 3) insert files, or ignore if they exist
  // 4) return full gist
})

module.exports = router