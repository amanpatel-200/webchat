import mongoose from "mongoose"
import { configDotenv } from "dotenv";
configDotenv();
export const mongodbConnect = async ()=>{
   try{
    await mongoose.connect(process.env.MONGODB_URL)
     console.log("DB connecte successfully")
 } catch(error){
 console.log(error)
}
}