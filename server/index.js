import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"

import allRoutes from "./routes/index.js"

const app = express()
const PORT = process.env.PORT || 5000

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(bodyParser.json())


const connectionDB = ()=>{
    try {
    mongoose.connect(process.env.CONNECTION_URL)
    console.log("Connected to MONGO") 
    } catch (error) {
    res.status(500).json(error)
    }
}

app.use("/api", allRoutes)

app.listen(PORT, ()=>{
    connectionDB()
    console.log(`Server running: ${PORT}`)
})