const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Order Placed" },
    date: { type: Date, default: Date.now },
    payment: { type: Boolean, default: false },
    paymentType: { type: String, enum: ["Full Payment", "Advance Payment"], required: true },
    advancePaid: { type: Number, default: 0 },
    remainingBalance: { type: Number, default: 0 }
});

// ❌ Remove "export default"
// ✅ Use module.exports
module.exports = mongoose.model("order", orderSchema);