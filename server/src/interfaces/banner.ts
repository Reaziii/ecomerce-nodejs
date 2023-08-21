import { Document } from "mongoose";
interface bannerInterface extends Document {
    path: string;
    active: boolean;
}

export default bannerInterface;