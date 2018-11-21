const knex = require("knex")({
    client: "pg",
    connection: {
        host: "locahost",
        database: "twatson"
    }
})

module.exports = knex