const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    database: "twatson"
  }
})

module.exports = knex