import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()


// below are the configurations for the express app using middlewares

// app.use(cors()) //Generally it is sufficient to use cors() without any options, but you can customize it if needed.
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

// for parsing application/json
app.use(express.json())

// for parsing urlencoded data means data is coming from the url like xyz+abc=123&xyz=456
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// for static files means you can store images, pdf like files in public folder
app.use(express.static('public'))

// for parsing cookies means if you are using cookies in your application then you have to use this middleware
app.use(cookieParser()) 


export { app }