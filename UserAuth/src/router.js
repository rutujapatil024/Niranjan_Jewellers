const express = require("express");
const loginUsers = require("./module/login");
const registerUser = require("./module/register");
const jewellery = require("./module/jewellery");
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

module.exports = router;