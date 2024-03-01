import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connectDB = async () => {
    try {
       const connectionInstances = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log(`mongo db connected || host ${connectionInstances.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error ", error);
        process.exit(1)
    }
}
export default connectDB;