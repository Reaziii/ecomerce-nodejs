import mongoose, { Schema, Document } from 'mongoose';
import productImageInterface from '../interfaces/productImage';
const ProductImageSchema: Schema = new Schema({
    image: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    type: { type: String, enum: ['thumb', 'image'], required: true },
});
const ProductImageModel = mongoose.model<productImageInterface>('ProductImage', ProductImageSchema);
export default ProductImageModel;