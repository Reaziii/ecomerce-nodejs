import mongoose, { Schema, Document } from 'mongoose';
import categoryInterface from '../interfaces/catagoryInterface';
const CategorySchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    logo: { type: String, required: true },
});

const CategoryModel = mongoose.model<categoryInterface>('Category', CategorySchema);
export default CategoryModel;