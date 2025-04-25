// we have to import dotenv file also
// require('dotenv').config({path:'./env'})


// or

// import dotenv from "dotenv"
// dotenv.config({
//     path: "./env"
// })

//or

import 'dotenv/config';
import connectDB from './db/dbConnntion.js';
import express from 'express';

const app = express();

// connectDB is a function that connects to the MongoDB database using Mongoose
// it is imported from the dbConnntion.js file and is called here to establish the connection
// because index file loads first so we have to call it here
// it will return a promise because we use async await
connectDB()
    .then(
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`)
        }),
        // this will tell if connection is correct but your express is not working then it will give error it is express part
        app.on("error", (error) => {
            console.error("Error connecting Express", error)
            throw err
        })
    )
    .catch((error) => {
        console.log("Error connecting mongoDB", error)
    })










// this is one approce for defining every thing in index.js and it is goood approch but it pollutes the database which we have to prevent
/*
import mongoose from 'mongoose';
import { DB_NAME } from './constents';
import express from 'express';
const app = express();
// this is an immediately invoked function expression (IIFE) that connects to the MongoDB database using Mongoose
// we dont have to export it because its IIFE its autometically call
// ; is used to avoid any issues with the previous line of code and this is proffessional practice
; (async () => {
    try {
        // connect to the MongoDB database using Mongoose
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        // this will tell if connection is correct but your express is not working then it will give error it express part
        app.on("error", (error) => {
            console.error("MongoDB connection error:", error)
            throw err
        })
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })

    } catch {
        console.error('Error connecting to mongoDB', error)
        throw err
    }
})()
    */