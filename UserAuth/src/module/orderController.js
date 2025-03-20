const orderModel = require("../model/orderModel");

// 📌 1️⃣ Full Payment Order Handler
const placeFullPaymentOrder = async (req, res) => {
    try {
        console.log(req.body, "req.body");
        const { userId, products, amount, address } = req.body;

        const newOrder = new orderModel({
            userId,
            products,
            amount,
            address,
            payment: true, // Full payment is done
            paymentType: "Full Payment",
            advancePaid: amount, // Paid full amount
            remainingBalance: 0 // No remaining balance
        });

        await newOrder.save();
        res.status(201).json({ success: true, message: "Full Payment Order Placed Successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: "Order Placement Failed", error: error.message });
    }
};

// 📌 2️⃣ Click & Collect Order Handler (Advance Payment)
const placeAdvancePaymentOrder = async (req, res) => {
    try {
        const { userId, products, amount, address } = req.body;
        const advancePaid = amount * 0.50; // 50% of total
        const remainingBalance = amount - advancePaid;

        const newOrder = new orderModel({
            userId,
            products,
            amount,
            address,
            payment: false, // Payment is not fully completed
            paymentType: "Advance Payment",
            advancePaid,
            remainingBalance
        });

        await newOrder.save();
        res.status(201).json({ success: true, message: "Advance Payment Order Placed Successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: "Order Placement Failed", error: error.message });
    }
};

// 📌 3️⃣ Get User Orders (My Orders Page)
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId }).sort({ date: -1 });

        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch orders", error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ date: -1 });

        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch orders", error: error.message });
    }
};

module.exports = {
    placeFullPaymentOrder,
    placeAdvancePaymentOrder,
    getUserOrders,
    getAllOrders
};
