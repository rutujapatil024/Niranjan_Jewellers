import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";  // Added useNavigate for redirecting to login
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";
import "./ItemDetails.css";

const ItemDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();  // Hook for navigation
    const { product_list, wishlist, addToWishlist, removeFromWishlist, addToCart, cart, updateCartQuantity, token } = useContext(StoreContext);
    const [item, setItem] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");

    useEffect(() => {
        if (product_list) {
            const foundItem = product_list.find((product) => product._id === id);
            setItem(foundItem);
        }
    }, [product_list, id]);

    if (!item) {
        return <h2 className="error-message">Item not found</h2>;
    }

    const isWishlisted = wishlist.some((w) => w._id === item._id);
    console.log("Rendering Jewelitem with:", item);

    const handleAddToCart = () => {
        if (!token) {
            alert("Please login to add items to cart.");
           // navigate("/login");  // Redirect to login page if not logged in
            return;
        }

        if (item.sizes?.length > 0 && !selectedSize) {
            alert("Please select a size before adding to cart.");
            return;
        }

        addToCart(item, selectedSize);
    };

    const cartItem = cart.find((cartItem) => cartItem._id === item._id && cartItem.size === selectedSize);

    return (
        <div className="item-details">
            <div className="image-container">
                <img src={item.image} alt={item.name} className="product-image" />
            </div>
            <div className="details-container">
                <h2 className="item-title">
                    {item.name}
                    <img
                        src={isWishlisted ? assets.red_wishlist : assets.wishlist}
                        alt="Wishlist"
                        className="wishlist-icon"
                        onClick={() => isWishlisted ? removeFromWishlist(item._id) : addToWishlist(item)}
                    />
                </h2>

                <p className="description">{item.description}</p>
                <p className="price">₹{item.price}</p>
                
                {/* Size selector if sizes are available */}
                {Array.isArray(item.sizes) && item.sizes.length > 0 && (
                    <div className="size-selector">
                        <label>Select Size:</label>
                        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                            <option value="">Choose Size</option>
                            {item.sizes.map((size, index) => (
                                <option key={index} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="actions">
                    {cartItem ? (
                        <div className="quantity-control">
                            <button
                                onClick={() => updateCartQuantity(item._id, selectedSize, cartItem.quantity - 1)}
                                disabled={cartItem.quantity <= 1}
                            >
                                -
                            </button>
                            <span>{cartItem.quantity}</span>
                            <button
                                onClick={() => updateCartQuantity(item._id, selectedSize, cartItem.quantity + 1)}
                                disabled={cartItem.quantity >= 5}
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <button className="buy-now" onClick={handleAddToCart}>Add to Cart</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;
