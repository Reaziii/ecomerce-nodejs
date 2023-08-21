import { JwtPayload } from "jsonwebtoken";

interface tokenInterface extends JwtPayload{
    name:string,
    email:string,
    address:string,
    zipCode:string,
    isAdmin:boolean,
    phoneNumber:string,
    _id:string,
}

export default tokenInterface;