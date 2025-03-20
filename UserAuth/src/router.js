const express = require("express");
const loginUsers = require("./module/login");
const registerUser = require("./module/register");
const jewellery = require("./module/jewellery");
const orderController = require("./module/orderController");

const multer = require('multer');
const fs = require('fs');

const router = express.Router();
const storage = multer.memoryStorage(); // Store file in memory (no need to save to disk)
const upload = multer({ storage });

router.post('/login', loginUsers);
router.post('/register', registerUser);
router.post('/jewellery', upload.single('image'), jewellery.addJewellery);
router.get('/jewellery', jewellery.getJewellery);
router.post('/jewellery/remove', jewellery.removeJewellery);
router.post('/jewellery/update', upload.single('image'), jewellery.updateJewellery);

// Full Payment Order Route
router.post("/order/full-payment", upload.none() ,orderController.placeFullPaymentOrder);

// Advance Payment (Click & Collect) Order Route
router.post("/order/advance-payment", orderController.placeAdvancePaymentOrder);

// Get User Orders
router.post("/order/userorder", orderController.getUserOrders);

router.get("/order/allorders", orderController.getAllOrders);

module.exports = router;