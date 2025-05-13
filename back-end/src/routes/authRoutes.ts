import {Router} from "express";
import { authUser } from "../controllers/authControllers";


const router = Router();



router.post("/", authUser); 
    

export default router;
