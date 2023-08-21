import { Request } from "express";
import orderInterface from "../interfaces/order";
import orderModel from "../schemas/order";
import productInterface from "../interfaces/productInterfaces";
import ProductModel from "../schemas/product";
import userInterface from "../interfaces/userInterface";
import UserModel from "../schemas/userSchema";
export const initPayment = async (req: Request): Promise<{ status: boolean, order?: orderInterface, message: string, price?: number }> => {
    try {
        if (!req.body.productId || !req.body.userId || !req.body.contact || !req.body.address) {
            return { status: false, message: "All the fields are required" }
        }
        const product: productInterface | null = await ProductModel.findById(req.body.productId);
        if (!product) {
            return { status: false, message: "Product doesn't exists" }
        }
        const user: userInterface | null = await UserModel.findById(req.body.userId);
        if (!user) {
            return { status: false, message: "user doesn't exists" };
        }
        const newOrder: orderInterface = new orderModel({
            paymentStatus: "pending",
            productId: req.body.productId,
            userId: req.body.userId,
            deliveryStatus: "pending",
            contact: req.body.contact,
            address: req.body.address,
        });
        await newOrder.save();
        return { status: true, order: newOrder, message: "", price: product.price };
    }
    catch (err) {
        return { status: false, message: "server error" };
    }

}

export const successPayment = async (orderId: string): Promise<{ status: boolean, message: string }> => {
    try {
        const order: orderInterface | null = await orderModel.findById(orderId);
        if (!order) {
            return { status: false, message: "order doesn't exist" };
        }

        order.paymentStatus = "success";
        await order.save();
        return { status: true, message: "Payment recieved" };

    }
    catch (err) {
        return { status: false, message: "Failed to recieve payment! please try refund" };
    }
}


export const failedPayment = async (orderId: string): Promise<{ status: boolean, message: string }> => {
    try {
        const order: orderInterface | null = await orderModel.findById(orderId);
        if (!order) {
            return { status: false, message: "order doesn't exist" };
        }
        await order.deleteOne();
        return { status: true, message: "Order deleted!" }
    }
    catch (err) {
        return { status: false, message: "something went wrong" };
    }
}