// Define the User interface
import { Document } from "mongoose";
interface userInterface extends Document {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    zipCode: string;
    password: string;
    isAdmin:boolean;
    _id:string;
}
export default userInterface;

