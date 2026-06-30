import express from "express";
import { getMessage, sendMesssage } from "../Controllers/MessageController.js";
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";
const messageRouter = express.Router();
messageRouter.post("/send/:id",isAuth,upload.single("image"),sendMesssage)
messageRouter.get("/getmessage/:id", isAuth,getMessage);
export default messageRouter;

