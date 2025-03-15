import React, { useContext, useEffect } from 'react';
import './Wishlist.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const { wishlist, setWishlist, removeFromWishlist, addToCart, token } = useContext(StoreContext);
    const navigate = useNavigate();

    // Load wishlist from localStorage on component mount
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
        if (storedWishlist) {
            setWishlist(storedWishlist);
        }
    }, [setWishlist]);

    return (
        <div className='wishlist'>
            <h2>My Wishlist</h2>
            {!token || wishlist.length === 0 ? (
                <p className="empty-wishlist">Your wishlist is empty.</p>
            ) : (
                <div className="wishlist-grid">
                    {wishlist.map((item, index) => (
                        <div key={index} className='wishlist-card'>
                            <div 
                                className="wishlist-product" 
                                onClick={() => navigate(`/item-details/${item._id}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <img src={item.image} alt={item.name} className='wishlist-image' />
                                <div className="wishlist-info">
                                    <h3>{item.name}</h3>
                                    <p>₹{item.price}</p>
                                </div>
                            </div>
                            <div className="wishlist-actions">
                                <button
                                    onClick={() => {
                                        removeFromWishlist(item._id);
                                        setWishlist(prev => prev.filter(i => i._id !== item._id)); 
                                    }}
                                    className='remove-btn'
                                >
                                    Remove
                                </button>
                                <button
                                    onClick={() => {
                                        addToCart(item);
                                        removeFromWishlist(item._id);
                                        setWishlist(prev => prev.filter(i => i._id !== item._id)); 
                                    }}
                                    className='add-to-cart-btn'
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
