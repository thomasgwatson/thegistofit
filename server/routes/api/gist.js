const express = require("express")
const router = express.Router()
const Promise = require("bluebird")
const db = require("../../db.js")
const getFullGist = require("../../models/gist/getFullGist")

router.get("/", function (req, res) {
  db.select().from("gist")
    .then(function(data) {res.send(data)})
})

router.get("/:gistId", function(req, res){
  const gistId = req.params.gistId
  getFullGist(gistId)
    .then((ret) => res.send(ret))
})

router.put("/:gistId", function(req, res){
  // take req.body, parse out gist, version, files
  const {gist, version, files} = req.body
  // console.log(gist, version, files)

  // while a gist may have many versions, each request can ONLY include one version to be inserted at a time

  // validate only one version

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
        return Promise.map(version.fileIds, (fileId) => {
          // console.log(`version_file insert ${fileId}`)
          return trx
            .raw(`
              INSERT INTO version_file (version_id, file_id)
              VALUES (?, ?)
              ON CONFLICT DO NOTHING
            `, [version.version_id, fileId])
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