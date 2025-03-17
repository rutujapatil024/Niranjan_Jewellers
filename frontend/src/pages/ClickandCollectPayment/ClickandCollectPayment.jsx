import React, { useContext } from 'react';
import './ClickAndCollectPayment.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const ClickAndCollectPayment = () => {
    const { getTotalAmount } = useContext(StoreContext);
    const cartAmount = getTotalAmount();  
    const makingCharges = cartAmount * 0.10;
    const sgst = cartAmount * 0.015;
    const cgst = cartAmount * 0.015;
    const finalAmount = cartAmount + makingCharges + sgst + cgst;
    const advancePayment = finalAmount * 0.50; // 50% Payment

    const navigate = useNavigate();

    const handlePayment = () => {
        alert("Advance Payment Successful! Your order has been placed.");
        navigate('/order-confirmation');
    };

    return (
        <div className="click-and-collect-payment">
            <h1>Click & Collect - Payment</h1>
            <h2>Niranjan Jewellers</h2>
            <p>Please pay 50% of your total amount to confirm your order.</p>
            
            <div className="payment-details">
                <p><strong>Total Amount:</strong> Rs. {finalAmount.toFixed(2)}</p>
                <p><strong>Advance Payment (50%):</strong> Rs. {advancePayment.toFixed(2)}</p>
            </div>
            
            <button className="pay-button" onClick={handlePayment}>Pay Rs. {advancePayment.toFixed(2)}</button>
        </div>
    );
};

export default ClickAndCollectPayment;
