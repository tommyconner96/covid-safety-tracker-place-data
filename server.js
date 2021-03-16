const express = require("express")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const placesRouter = require("./routers/placesRouter")
const googleApiRouter = require("./routers/googleApi")
const cors = require("cors")
const server = express()
const url = process.env.FRONTEND_URL

require('dotenv').config()
server.use(helmet())
server.use(cookieParser())
server.use(express.json())

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", url)
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Set-Cookie")
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
server.use(cors({
    credentials: true,
    origin: url,
}))

server.use("/places/", placesRouter)
server.use("/googleApi/", googleApiRouter)

server.get("/", (req, res, next) => {
    res.status(200).json({
        message: "hi hello welcome",
    })
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong",
    })
})

module.exports = server