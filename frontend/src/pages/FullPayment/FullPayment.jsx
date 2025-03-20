import React, { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import './FullPayment.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const FullPayment = () => {
    const { cart, getTotalAmount, clearCart } = useContext(StoreContext);
    const user = JSON.parse(localStorage.getItem('user'));
    const form = JSON.parse(localStorage.getItem('customer'));
    const cartAmount = getTotalAmount();  
    const makingCharges = cartAmount * 0.10;
    const sgst = cartAmount * 0.015;
    const cgst = cartAmount * 0.015;
    const finalAmount = cartAmount + makingCharges + sgst + cgst;

    const navigate = useNavigate();
    const customerData = JSON.parse(localStorage.getItem('customer')) || {};

if (!customerData.address) {
    console.error("Address data missing!");
    alert("Address details are missing. Please go back and fill the form.");
    navigate('/placeorder');
}


    // Handle Full Payment API Submission
    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const form = JSON.parse(localStorage.getItem('customer')); // ✅ Ensure form is retrieved
    
            if (!form) {
                toast.error("Address details missing!");
                return;
            }
    
            const orderData = new FormData();
            orderData.append('userId', user.id);
            orderData.append('amount', finalAmount);
            orderData.append('paymentType', 'Full Payment');
    
            // ✅ Ensure address is properly appended
            orderData.append(
                'address',
                JSON.stringify({
                    firstName: form.firstName,
                    lastName: form.lastName,
                    address: form.address,
                    city: form.city,
                    pincode: form.pincode,
                    state: form.state,
                    phone: form.phone,
                })
            );
    
            cart.forEach((item) => {
                orderData.append(
                    'products',
                    JSON.stringify({
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price,
                        size: item.size,
                        image: item.image,
                    })
                );
            });
    
            const response = await axios.post(
                'http://localhost:3001/api/auth/order/full-payment',
                orderData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
    
            if (response.data.success) {
                toast.success('Payment Successful! Your order has been placed.');
                navigate('/fullpayment-confirmation');
            } else {
                toast.error('Error placing order. Please try again.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Server error, please try again later.');
        }
    };
    

    return (
        <div className="full-payment">
            <h1>Full Payment</h1>
            <h2>Niranjan Jewellers</h2>
            <p>Please pay the full amount to confirm your order.</p>
            
            <div className="payment-details">
                <p><strong>Total Amount:</strong> Rs. {finalAmount.toFixed(2)}</p>
            </div>
            
            <button className="pay-button" onClick={(e) => handlePayment(e)}>
                Pay Rs. {finalAmount.toFixed(2)}
            </button>
        </div>
    );
};

export default FullPayment;
