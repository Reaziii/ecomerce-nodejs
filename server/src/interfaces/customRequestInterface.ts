import { Request } from "express";
import userInterface from "./userInterface";

interface CustomRequestInterface extends Request {
    user?: userInterface;
}

export default CustomRequestInterface;