import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import UserModel from "../schemas/userSchema";
import tokenInterface from "../interfaces/tokenPayload";
import userInterface from "../interfaces/userInterface";
import CustomRequestInterface from "../interfaces/customRequestInterface";
export const checkAuthentication = async (req: CustomRequestInterface, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        let decodedvalue = jwt.verify(token ?? "", process.env.SECRET ?? "SECRET") as tokenInterface;
        const user: userInterface | null = await UserModel.findById(decodedvalue._id);
        if(!user) throw "";
        req.user = user;
        next();
    }
    catch (err) {
        res.status(400).send({ status: false, message: "Unauthorized" })
    }
}

export const checkAdminAuthentication = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        const user = jwt.verify(token ?? "", process.env.SECRET ?? "SECRET") as { [key: string]: any };
        if (!user.isAdmin) {
            throw "";
        }
        next();
    }
    catch (err) {
        res.status(400).send({ status: false, message: "Unauthorized" })
    }
}