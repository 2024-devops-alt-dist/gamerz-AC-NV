import {Router} from "express";

//import usersControllers from "../controllers/usersControllers.js";
import { postUser, getUser, getOneUser, deleteUser, updateUser,approveUser, refuseUser, getCurrentUser } from "../controllers/usersControllers.js";
//import authMiddleware from "../utils/authMiddleware.ts";

console.log("getOneUser:", getOneUser);

const router = Router();



router.post("/", postUser);
router.get("/", getUser);
router.get('/me',getCurrentUser);
router.get("/:id", getOneUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.put("/approve/:id", approveUser);
router.put("/refuse/:id", refuseUser);

export default router;