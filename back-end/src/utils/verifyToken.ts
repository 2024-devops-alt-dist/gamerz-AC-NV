
import 'express';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  userId: string;
  username: string;
  role: string;
}

declare module 'express' {
  interface Request {
    user?: JwtPayload;
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
    req.user = decoded; // attaché à l’objet req pour y accéder plus tard
    next();
  } catch {
    res.status(403).json({ message: 'Token invalide' });
  }
};
