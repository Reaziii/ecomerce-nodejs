import mongoose, { Schema, Document } from 'mongoose';
import userInterface from '../interfaces/userInterface';
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  zipCode: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
});
const UserModel = mongoose.model<userInterface>('User', UserSchema);
export default UserModel;
