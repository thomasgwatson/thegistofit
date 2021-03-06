/* eslint no-console: "off" */
const express = require("express")
const apiRoute = require("./routes/api")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use("/api", apiRoute)

// middleware

app.listen("3000", function(){
  console.log("Server started on port 3000")
})