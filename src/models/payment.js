import mongoose from 'mongoose';
const paymentSchema = new mongoose.Schema(
    {
        tenant: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        houseId: {
            type: mongoose.Schema.ObjectId,
            ref: "house"
        },

        month: {
            type: String,
            required: true
        },
        amount: {
            type: String,
            required: true
        },
        isPaid: {
            type: String,
            enum: ["pending", "paid", "not paid"],
            default: "pending"

        }

    },
    {
        timestamps: true,
    }
);
const payment = mongoose.model('tenantPayment', paymentSchema);

export default payment;