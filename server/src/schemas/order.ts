import mongoose from "mongoose";
import orderInterface from "../interfaces/order";

const { Schema } = mongoose;

const orderSchema = new Schema({
    productId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['success', 'failed', 'pending'],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    deliveryStatus: {
        type: String,
        enum: ['pending', 'delivered', 'received', 'canceled'],
        required: true
    },
    contact: {
        type: String,
        required: true
    }
});

const orderModel = mongoose.model<orderInterface>("order", orderSchema);

export default orderModel;
