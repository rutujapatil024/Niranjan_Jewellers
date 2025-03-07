const express = require('express');
const twilio = require('twilio');
const router = express.Router();
const crypto = require('crypto');

// Twilio Setup
const accountSid = 'your_twilio_account_sid';
const authToken = 'your_twilio_auth_token';
const client = twilio(accountSid, authToken);

let otpStore = {}; // In-memory storage (use database in production)

// Route to send OTP to contact number
router.post('/send-otp', async (req, res) => {
  const { contactNumber } = req.body;

  if (!contactNumber || !/^\d{10}$/.test(contactNumber)) {
    return res.status(400).json({ message: 'Invalid contact number.' });
  }

  // Generate a 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  // Store OTP for validation (in-memory for simplicity)
  otpStore[contactNumber] = otp;

  // Send OTP via SMS using Twilio
  try {
    const message = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: '+1234567890', // Your Twilio phone number
      to: `+1${contactNumber}`, // The contact number entered by the user
    });

    return res.status(200).json({ message: 'OTP sent successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
  }
});

// Route to verify OTP
router.post('/verify-otp', (req, res) => {
  const { contactNumber, otp } = req.body;

  if (!contactNumber || !otp || !otpStore[contactNumber]) {
    return res.status(400).json({ message: 'Invalid request.' });
  }

  // Verify OTP
  if (otp === otpStore[contactNumber]) {
    // OTP is correct, allow user to reset password
    delete otpStore[contactNumber]; // Clear OTP after successful verification
    return res.status(200).json({ message: 'OTP verified successfully. You can now reset your password.' });
  } else {
    return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
  }
});

module.exports = router;
