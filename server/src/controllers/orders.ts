import orderInterface from "../interfaces/order"
import productImageInterface from "../interfaces/productImage";
import productInterface from "../interfaces/productInterfaces";
import userInterface from "../interfaces/userInterface";
import orderModel from "../schemas/order"
import ProductModel from "../schemas/product";
import UserModel from "../schemas/userSchema";

export const getUserOrders = async (userId: string): Promise<{ status: boolean, message: string, orders?: { product: productInterface, order: orderInterface }[] }> => {
    try {
        const orders: orderInterface[] = await orderModel.find({ userId, paymentStatus: "success" });

        const __orders: { product: productInterface, order: orderInterface }[] = [];

        for (let i = 0; i < orders.length; i++) {
            const product: productInterface | null = await ProductModel.findById(orders[i].productId);
            if (!product) continue;
            __orders.push({ order: orders[i], product: product });
        }


        return { status: true, message: "orders retrived successfully", orders: __orders };
    }
    catch (err) {
        return { status: false, message: "Failed to retrive orders" }
    }
}

export const getAllOrders = async (): Promise<{ status: boolean, message: string, orders?: { product: productInterface, order: orderInterface, user: userInterface }[] }> => {
    try {
        const orders: orderInterface[] = await orderModel.find({ paymentStatus: "success" });
        const __orders: { product: productInterface, order: orderInterface, user: userInterface }[] = [];

        for (let i = 0; i < orders.length; i++) {
            const product: productInterface | null = await ProductModel.findById(orders[i].productId);
            const user: userInterface | null = await UserModel.findById(orders[i].userId);
            if (!product || !user) continue;
            __orders.push({ order: orders[i], product: product, user });
        }


        return { status: true, message: "orders retrived successfully", orders: __orders };
    }
    catch (err) {
        return { status: false, message: "Failed to retrive orders" }
    }
}

export const deliveryStatusChange = async (orderId: string, status: "pending" | "delivered" | "received" | "canceled"): Promise<{ status: boolean, message: string }> => {
    try {
        const order: orderInterface | null = await orderModel.findById(orderId);
        if (!order) {
            return { status: false, message: "order doesn't exist" };
        }
        order.deliveryStatus = status;
        await order.save();
        return { status: true, message: "Order delivery status changed to " + status };
    }
    catch (err) {
        console.log(err);
        return { status: false, message: "Failed to change the status" };
    }
}
