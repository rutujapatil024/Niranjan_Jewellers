import React, { useContext, useEffect } from 'react';
import './Wishlist.css';
import { StoreContext } from '../../Context/StoreContext';

const Wishlist = () => {
    const { wishlist, removeFromWishlist, addToCart, token } = useContext(StoreContext);

    useEffect(() => {
        if (!token) {
            // Clear wishlist when user logs out
            removeFromWishlist(null);  // Consider adding logic in context to clear all when null is passed.
        }
    }, [token, removeFromWishlist]);

    return (
        <div className='wishlist'>
            <h2>My Wishlist</h2>
            {!token || wishlist.length === 0 ? (
                <p className="empty-wishlist">Your wishlist is empty.</p>
            ) : (
                <div className="wishlist-grid">
                    {wishlist.map((item, index) => (
                        <div key={index} className='wishlist-card'>
                            <img src={item.image} alt={item.name} className='wishlist-image' />
                            <div className="wishlist-info">
                                <h3>{item.name}</h3>
                                <p>₹{item.price}</p>
                                <div className="wishlist-actions">
                                    <button
                                        onClick={() => removeFromWishlist(item._id)}
                                        className='remove-btn'
                                    >
                                        Remove
                                    </button>
                                    <button
                                        onClick={() => {
                                            addToCart(item);
                                            removeFromWishlist(item._id);
                                        }}
                                        className='add-to-cart-btn'
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
