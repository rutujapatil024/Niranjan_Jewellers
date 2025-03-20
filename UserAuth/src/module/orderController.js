const orderModel = require("../model/orderModel");

// 📌 1️⃣ Full Payment Order Handler
const placeFullPaymentOrder = async (req, res) => {
  try {
    console.log(req.body, "req.body");
    const { userId, products, amount, address } = req.body;

    // ✅ Parse address if it's a string
    const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;

    const newOrder = new orderModel({
      userId,
      products: JSON.parse(products), // ✅ Parse products if sent as a string
      amount,
      address: parsedAddress, // ✅ Correctly assign parsed address
      payment: true, // Full payment is done
      paymentType: "Full Payment",
      advancePaid: amount, // Paid full amount
      remainingBalance: 0, // No remaining balance
    });

    await newOrder.save();
    res.status(201).json({
      success: true,
      message: "Full Payment Order Placed Successfully",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order Placement Failed",
      error: error.message,
    });
  }
};

// 📌 2️⃣ Click & Collect Order Handler (Advance Payment)
const placeAdvancePaymentOrder = async (req, res) => {
  try {
    const { userId, products, amount, address } = req.body;
    const advancePaid = amount * 0.50; // 50% of total
    const remainingBalance = amount - advancePaid;

    // ✅ Parse address if it's a string
    const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;

    const newOrder = new orderModel({
      userId,
      products: JSON.parse(products), // ✅ Parse products if sent as a string
      amount,
      address: parsedAddress, // ✅ Correctly assign parsed address
      payment: false, // Payment is not fully completed
      paymentType: "Advance Payment",
      advancePaid,
      remainingBalance,
    });

    await newOrder.save();
    res.status(201).json({
      success: true,
      message: "Advance Payment Order Placed Successfully",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order Placement Failed",
      error: error.message,
    });
  }
};

// 📌 3️⃣ Get User Orders (My Orders Page)
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// 📌 4️⃣ Get All Orders (Admin Dashboard)
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// 📌 5️⃣ Update Order Status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // ✅ Use orderModel correctly
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("userId", "firstName lastName email");

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

module.exports = {
  placeFullPaymentOrder,
  placeAdvancePaymentOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
};
