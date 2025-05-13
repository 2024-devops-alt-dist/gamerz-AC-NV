import {Router} from "express";
import { authUser,getMe } from "../controllers/authControllers.js";
import { verifyToken } from '../utils/verifyToken.js';



const router = Router();

router.post("/", authUser);
router.get('/me', verifyToken, getMe); 
    

export default router;
