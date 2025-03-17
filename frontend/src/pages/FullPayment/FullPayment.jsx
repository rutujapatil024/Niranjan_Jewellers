// FullPayment.jsx - Full Payment Page
import React, { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import './FullPayment.css';

const FullPayment = () => {
    const { getTotalAmount } = useContext(StoreContext);
    const cartAmount = getTotalAmount();  
    const makingCharges = cartAmount * 0.10;
    const sgst = cartAmount * 0.015;
    const cgst = cartAmount * 0.015;
    const finalAmount = cartAmount + makingCharges + sgst + cgst;

    const navigate = useNavigate();

    const handlePayment = () => {
        alert("Payment Successful! Your order has been placed.");
        navigate('/fullpayment-confirmation');
    };

    return (
        <div className="full-payment">
            <h1>Full Payment</h1>
            <h2>Niranjan Jewellers</h2>
            <p>Please pay the full amount to confirm your order.</p>
            
            <div className="payment-details">
                <p><strong>Total Amount:</strong> Rs. {finalAmount.toFixed(2)}</p>
            </div>
            
            <button className="pay-button" onClick={handlePayment}>Pay Rs. {finalAmount.toFixed(2)}</button>
        </div>
    );
};

export default FullPayment;

