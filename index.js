const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()

mongoose.connect("mongodb://localhost:27017/huongdichvu", { useNewUrlParser: true })
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.raw())

app.use(cors())

app.listen(process.env.PORT || 3000, () => {
    console.log(process.env.PORT);
})

require("./src/routes/student.route")(app)