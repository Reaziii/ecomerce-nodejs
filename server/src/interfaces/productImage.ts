import { Document } from "mongoose";
interface productImageInterface extends Document {
    image: string;
    productId: string;
    type: 'thumb' | 'image';
    _id: string;
}

export default productImageInterface;