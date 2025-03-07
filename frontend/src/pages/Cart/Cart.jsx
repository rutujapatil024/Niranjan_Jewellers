import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, token } = useContext(StoreContext);
    const navigate = useNavigate();

    // Clear cart if user logs out (token becomes null/undefined)
    useEffect(() => {
        if (!token) {
            removeFromCart(null); // Use logic in your context to clear the entire cart if itemId is null.
        }
    }, [token, removeFromCart]);

    const handleRemoveFromCart = (itemId, size) => {
        removeFromCart(itemId, size);  // Handle size-specific removal
    };

    const getTotalAmount = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleCheckout = () => {
        if (!token) {
            alert('Please login to proceed with checkout.');
            navigate('/login');  // Redirect to login page if not logged in
        } else {
            navigate('/placeorder');  // Proceed if logged in
        }
    };

    return (
        <div className="cart-container">
            <h2>My Cart</h2>
            {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
            ) : (
                <div className="cart-items">
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <p>Price: ₹{item.price}</p>
                                {item.size && <p>Size: {item.size}</p>}
                                <p>Quantity: {item.quantity}</p>
                                <button className="remove-btn" onClick={() => handleRemoveFromCart(item._id, item.size)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {cart.length > 0 && (
                <div className="cart-total">
                    <h3>Total Amount: ₹{getTotalAmount()}</h3>
                    <br />
                    <button className='checkout' onClick={handleCheckout}>
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
