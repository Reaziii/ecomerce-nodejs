import { Document } from "mongoose";

interface orderInterface extends Document {
    productId: string,
    userId: string,
    paymentStatus: "success" | "failed" | "pending",
    address: string,
    deliveryStatus: "pending" | "delivered" | "received" | "canceled",
    contact: string,
}

export default orderInterface;