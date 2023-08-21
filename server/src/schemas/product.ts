import mongoose, { Schema, Document } from 'mongoose';
import productInterface from '../interfaces/productInterfaces';



const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  categoryId: { type: String, required: true },
});

const ProductModel = mongoose.model<productInterface>('Product', ProductSchema);
export default ProductModel;