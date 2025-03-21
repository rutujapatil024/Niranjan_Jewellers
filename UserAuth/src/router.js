const express = require("express");
const loginUsers = require("./module/login");
const  registerUser = require("./module/register");
const jewellery = require("./module/jewellery");
const orderController = require("./module/orderController");

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

module.exports = router;
