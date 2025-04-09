import {Router} from "express";

//import usersControllers from "../controllers/usersControllers.js";
import { postUser, getUser, getOneUser, deleteUser, updateUser,approveUser, refuseUser } from "../controllers/usersControllers.ts";

console.log("getOneUser:", getOneUser);

const router = Router();



router.post("/", postUser);
router.get("/", getUser);
router.get("/:id", getOneUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
//router.get("/me", getCurrentUser); // get current user
router.put("/approve/:id", approveUser);
router.put("/refuse/:id", refuseUser);

export default router;
