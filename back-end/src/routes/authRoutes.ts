import {Router} from "express";
import { authUser } from "../controllers/authControllers.ts";


const router = Router();



router.post("/", authUser); 
    

export default router;
