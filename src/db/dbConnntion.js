import mongoose from "mongoose";
import { DB_NAME } from "../constents.js";

const connectDB = async () => {
    try {
        // we can also store it in the variable
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        // its just a good practice so that you can not forget on which server you are connected
        //  beacuse there may different server for production, develepment and more 
        // so its just a good practice
        console.log(`\n MongoDB is Connected !! DB HOST : ${connectionInstance.connection.host}`)
    } catch {
        console.error("Error conneting MongoDB", error)
        throw err
        // process.exit(1) //this is given by node module read it
    }
}

export default connectDB