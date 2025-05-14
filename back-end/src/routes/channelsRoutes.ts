import {Router} from "express";

//import usersControllers from "../controllers/usersControllers.js";
import { postChannel, getChannels, getOneChannel, deleteChannel, updateChannel } from "../controllers/channelsControllers.js";

console.log("getOneUser:", getOneChannel);

const router = Router();



router.post("/", postChannel);
router.get("/", getChannels);
router.get("/:id", getOneChannel);
router.delete("/:id", deleteChannel);
router.put("/:id", updateChannel);
export default router;
