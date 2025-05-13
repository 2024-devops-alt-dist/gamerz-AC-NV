import {Router} from "express";

//import MessagesControllers from "../controllers/MessagesControllers.js";
import { postMessage, getMessages, getOneMessage, deleteMessage, updateMessage, getChannelMessages } from "../controllers/messagesControllers";

console.log("getOneMessage:", getOneMessage);

const router = Router();


router.post("/", postMessage);
router.get("/", getMessages);
router.get("/:id", getOneMessage);
router.get("/channel/:channelId", getChannelMessages);
router.delete("/:id", deleteMessage);
router.put("/:id", updateMessage);
export default router;
