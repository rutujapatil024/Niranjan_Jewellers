import React, { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import './FullPayment.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const FullPayment = () => {
    const { cart, getTotalAmount, clearCart } = useContext(StoreContext);
    const user = JSON.parse(localStorage.getItem('user'));
    const cartAmount = getTotalAmount();  
    const makingCharges = cartAmount * 0.10;
    const sgst = cartAmount * 0.015;
    const cgst = cartAmount * 0.015;
    const finalAmount = cartAmount + makingCharges + sgst + cgst;

    const navigate = useNavigate();

    // Handle Full Payment API Submission
    const handlePayment = async () => {
        try {
            // const orderData = {
            //     userId: user.id, // Get logged-in user's ID
            //     products: cart.map(item => ({
            //         name: item.name,
            //         quantity: item.quantity,
            //         price: item.price,
            //         size: item.size,
            //         image: item.image
            //     })),
            //     amount: finalAmount,
            //     address: {
            //         firstName: user.firstName,
            //         lastName: user.lastName,
            //         address: user.address,
            //         city: user.city,
            //         pincode: user.pincode,
            //         state: user.state,
            //         phone: user.phone
            //     }
            //};
                const orderData = new FormData();
                orderData.append('userId', user.id);
                orderData.append('amount', finalAmount);
                orderData.append('address', JSON.stringify({    
                    firstName: user.firstName,
                    lastName: user.lastName,
                    address: user.address,
                    city: user.city,
                    pincode: user.pincode,
                    state: user.state,
                    phone: user.phone
                }));
                cart.forEach(item => {
                    orderData.append('products', JSON.stringify({
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price,
                        size: item.size,
                        image: item.image
                    }));
                }
            );

            const response = await axios.post('http://localhost:3001/api/auth/order/full-payment', orderData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success('Payment Successful! Your order has been placed.');
                //clearCart(); // Clear cart after successful order
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
            
            <button className="pay-button" onClick={handlePayment}>
                Pay Rs. {finalAmount.toFixed(2)}
            </button>
        </div>
    );
};

export default FullPayment;
