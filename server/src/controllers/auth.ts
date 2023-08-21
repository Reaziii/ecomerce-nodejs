import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import userInterface from '../interfaces/userInterface';
import UserModel from '../schemas/userSchema';
import isValidEmail from '../helpers/validateEmail';
import jwt from 'jsonwebtoken'
// Registration function
export async function registerUser(userData: userInterface): Promise<{ status: boolean; message: string }> {
    const { name, email, phoneNumber, address, zipCode, password } = userData;
    // Check if any field is empty
    if (!name || !email || !phoneNumber || !address || !zipCode || !password) {
        return { status: false, message: "All fields are required." };
    }
    // Check if email is valid
    if (!isValidEmail(email)) {
        return { status: false, message: "Invalid email address." };
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({
            name,
            email,
            phoneNumber,
            address,
            zipCode,
            isAdmin: false,
            password: hashedPassword,
        });
        await user.save();
        return { status: true, message: "Registered successfully." };
    } catch (error) {
        console.log(error);
        return { status: false, message: "Registration failed." };
    }
}

export async function loginUser(email: string, password: string): Promise<{ status: boolean, message: string, token?: string }> {
    try {
        const user: userInterface | null = await UserModel.findOne({ email });
        if (!user) {
            return { status: false, message: 'Invalid email or password' };
        }
        const isPasswordMatch: boolean = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return { status: false, message: 'Invalid email or password' };
        }
        const data = {
            name: user.name,
            email: user.email,
            address: user.address,
            zipCode: user.zipCode,
            isAdmin: user.isAdmin,
            phoneNumber: user.phoneNumber,
            _id: user._id,
        }
        const token = jwt.sign(data, process.env.SECRET ?? "SECRET");
        return { status: true, message: 'Login successful', token: token };
    } catch (error) {
        return { status: false, message: 'Login failed' };
    }
}