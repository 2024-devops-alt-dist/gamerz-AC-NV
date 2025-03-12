import {Router} from "express";

//import usersControllers from "../controllers/usersControllers.js";
import { postUser, getUser, getOneUser, deleteUser } from "../controllers/usersControllers.ts";

console.log("getOneUser:", getOneUser);

const router = Router();


router.post("/", postUser);
router.get("/", getUser);
router.get("/:id", getOneUser);
//router.delete("/:id", deleteUser);
export default router;
