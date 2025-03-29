const express = require("express");
const loginUsers = require("./module/login");
const registerUser = require("./module/register");
const jewellery = require("./module/jewellery");
const orderController = require("./module/orderController");
const jwt = require("jsonwebtoken");

const multer = require("multer");

const router = express.Router();

// ✅ Multer Configuration for Image Uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ User Authentication Routes
router.post("/login", loginUsers);
router.post("/register", registerUser);

// ✅ Jewellery Routes
router.post("/jewellery", upload.single("image"), jewellery.addJewellery);
router.get("/jewellery", jewellery.getJewellery);
router.post("/jewellery/remove", jewellery.removeJewellery);
router.post("/jewellery/update", upload.single("image"), jewellery.updateJewellery);

// ✅ Order Routes - Address Fix Only
router.post("/order/full-payment", upload.none(), orderController.placeFullPaymentOrder);
router.post("/order/advance-payment", upload.none(), orderController.placeAdvancePaymentOrder);
router.post("/order/userorder", upload.none(), orderController.getUserOrders);
router.get("/order/allorders", orderController.getAllOrders);
router.post("/order/update", upload.none(), orderController.updateOrderStatus);

// ✅ Admin Dashboard Routes
router.get("/admin/sales", orderController.getSalesData);
router.get("/admin/pending-payments", orderController.getPendingPayments);

const getUserProfile = require("./module/getUserProfile");

// Add this middleware function
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// ✅ User Profile Route
router.get("/user/profile", authenticateToken, getUserProfile);

module.exports = router;
