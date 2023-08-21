import { Document } from "mongoose";

interface productInterface extends Document {
    name: string;
    price: number;
    description: string;
    _id: string;
    categoryId: string;
}

export default productInterface;