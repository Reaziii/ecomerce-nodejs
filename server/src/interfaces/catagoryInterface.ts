import { Document } from "mongoose";

interface categoryInterface extends Document{
    name: string;
    logo: string;
}

export default categoryInterface;