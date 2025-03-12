import express from "express";
import {Router} from "express";
import { createUser } from "../controllers/usersControllers.js";

const router = express.Router();

router.post("/newuser", createUser); 
router.get("/users", createUser);

export default router;
