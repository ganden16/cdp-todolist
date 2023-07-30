const express = require("express")
const cors = require("cors")
require("dotenv").config()
const router = require("./routes")

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use(router)

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})