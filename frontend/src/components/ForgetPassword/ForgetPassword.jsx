import React, { useState } from 'react';
import './ForgetPassword.css'; // Add your custom CSS for styling
import axios from 'axios';

const ForgetPassword = ({ setShowForgetPassword }) => {
  const [contactNumber, setContactNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleChangeContact = (e) => {
    setContactNumber(e.target.value);
  };

  const handleChangeOtp = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async () => {
    setLoading(true);
    if (!/^\d{10}$/.test(contactNumber)) {
      setMessage('Please enter a valid 10-digit contact number.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/send-otp', { contactNumber });
      setMessage(response.data.message || 'OTP sent successfully.');
      setOtpSent(true);
    } catch (error) {
      setMessage('Error occurred while sending OTP. Please try again.');
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!otp.trim()) {
      setMessage('Please enter the OTP.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/verify-otp', { contactNumber, otp });
      setMessage(response.data.message || 'OTP verified successfully. You can now reset your password.');
      // Optionally, redirect to reset password page or show reset password form
    } catch (error) {
      setMessage('Invalid OTP. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="forget-password-popup">
      <div className="forget-password-container">
        <h2>Forgot Password</h2>
        <p>Enter your contact number to receive an OTP.</p>

        <form onSubmit={handleSubmit}>
          {!otpSent ? (
            <>
              <input
                type="text"
                placeholder="Contact Number"
                value={contactNumber}
                onChange={handleChangeContact}
                maxLength={10}
                required
              />
              <button type="button" onClick={handleSendOtp} disabled={loading}>
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleChangeOtp}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Verifying OTP...' : 'Verify OTP'}
              </button>
            </>
          )}
        </form>

        {message && <p className="message">{message}</p>}

        <button className="close-btn" onClick={() => setShowForgetPassword(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
