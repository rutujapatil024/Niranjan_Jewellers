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
      products,
      amount,
      address: parsedAddress,
      payment: true, // Full payment is done
      paymentType: "Full Payment",
      advancePaid: amount,
      remainingBalance: 0,
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

// 📌 2️⃣ Advance Payment Order Handler
const placeAdvancePaymentOrder = async (req, res) => {
  try {
    const { userId, products, amount, address } = req.body;
    const advancePaid = amount * 0.50;
    const remainingBalance = amount - advancePaid;

    // ✅ Parse address if it's a string
    const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;

    // ✅ Parse products if sent as a string
    const parsedProducts = typeof products === "string" ? JSON.parse(products) : products;

    const newOrder = new orderModel({
      userId,
      products: parsedProducts, // ✅ Correctly assign parsed products
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
    const orders = await orderModel
      .find({ userId })
      .populate("products.productId", "name price")
      .sort({ date: -1 });

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
    const orders = await orderModel
      .find({})
      .populate("products.productId", "name price")
      .sort({ date: -1 });

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

    const updatedOrder = await orderModel
      .findByIdAndUpdate(orderId, { status }, { new: true })
      .populate("userId", "firstName lastName email");

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

// 📌 6️⃣ Get Monthly & Yearly Sales Data
const getSalesData = async (req, res) => {
  try {
    const monthlySales = await orderModel.aggregate([
      {
        $group: {
          _id: { month: { $month: "$date" }, year: { $year: "$date" } },
          amount: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    const formattedData = monthlySales.map((sale) => ({
      month: `${sale._id.month}/${sale._id.year}`,
      year: sale._id.year,
      amount: sale.amount,
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch sales data",
      error: error.message,
    });
  }
};

// 📌 7️⃣ Get Pending Payments
const getPendingPayments = async (req, res) => {
  try {
    const pendingPayments = await orderModel.find({ payment: false }).select(
      "userId amount status"
    );

    const formattedData = pendingPayments.map((order) => ({
      orderId: order._id,
      customerName: order.userId, // Replace with actual name if needed
      amount: order.amount,
      status: order.status,
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending payments",
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
  getSalesData,
  getPendingPayments,
};
