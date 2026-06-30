import express from "express";
import { mongodbConnect } from "./utils/db.js";
import { configDotenv} from "dotenv";
import userRouter from "./Routes/user.route.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import messageRouter from "./Routes/meesage.route.js";
import { app,server } from "./socketio/server.js";
configDotenv();
const App = express();
const port = process.env.PORT||4000;
const corsOptions = {
  origin: "http://localhost:5173", 
  credentials: true,  
};
app.use(cors(corsOptions));
app.use(express.json()); 
app.use(cookieParser());
app.use("/api/user",userRouter);
app.use("/api/message",messageRouter);
server.listen(port , ()=>{
    mongodbConnect();
    console.log(`Server are running at ${port}`)
})
