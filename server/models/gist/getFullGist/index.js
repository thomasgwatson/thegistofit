const db = require("../../../db.js")
const Promise = require("bluebird")

function getFullGist (gistId) {
  return new Promise((resolve) => {
    let gist, versions, versionFileIds
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
      }).then((ret) => resolve({gist, versions, files: ret}))
  })
}

module.exports = getFullGist