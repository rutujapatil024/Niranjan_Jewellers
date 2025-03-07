import React, { createContext, useState, useEffect } from "react";
import { product_list as initialProducts } from '../assets/assets';

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
    const [product_list, setProductList] = useState(initialProducts, []);
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const [token, setToken] = useState("");
    const [forceUpdate, setForceUpdate] = useState(false);
    //fetch from backend
   // const [product_list,]

    const url = "http://localhost:3001";

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

        if (savedToken) {
            setToken(savedToken);
            setWishlist(savedWishlist);
            setCart(savedCart);
        }
    }, []);

    useEffect(() => {
        if (token) {
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [wishlist, cart, token]);

    // Function to clear wishlist & cart on logout
    const clearCartAndWishlistOnLogout = () => {
        setWishlist([]);
        setCart([]);
        localStorage.removeItem("wishlist");
        localStorage.removeItem("cart");
    };

    const addToWishlist = (item) => {
        if (!token) {
            alert("Please log in to add items to your wishlist.");
            return;
        }
        setWishlist((prev) => {
            if (prev.some((wishlistItem) => wishlistItem._id === item._id)) {
                return prev;
            }
            const updatedWishlist = [...prev, item];
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            return updatedWishlist;
        });
    };

    const removeFromWishlist = (itemId) => {
        setWishlist((prev) => {
            const updatedWishlist = prev.filter((item) => item._id !== itemId);
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            return updatedWishlist;
        });
    };

    const addToCart = (item, size = null) => {
        if (!token) {
            alert("Please log in to add items to your cart.");
            return;
        }
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (cartItem) => cartItem._id === item._id && cartItem.size === size
            );

            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem._id === item._id && cartItem.size === size
                        ? { ...cartItem, quantity: Math.min(cartItem.quantity + 1, 5) }
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, size, quantity: 1 }];
            }
        });
    };

    const updateCartQuantity = (itemId, size, newQuantity) => {
        setCart((prevCart) => {
            if (newQuantity < 1 || newQuantity > 5) return prevCart;

            return prevCart.map((cartItem) =>
                cartItem._id === itemId && cartItem.size === size
                    ? { ...cartItem, quantity: newQuantity }
                    : cartItem
            );
        });
    };

    const removeFromCart = (itemId, size) => {
        if (!token) {
            alert("Please log in to modify your cart.");
            return;
        }
        setCart((prevCart) => {
            const updatedCart = prevCart.filter(
                (cartItem) => !(cartItem._id === itemId && cartItem.size === size)
            );
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const logout = () => {
        setToken("");
        clearCartAndWishlistOnLogout();
        localStorage.removeItem("token");
        setForceUpdate((prev) => !prev);
    };

    const getTotalAmount = () => {
        return cart.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    };

    return (
        <StoreContext.Provider
            value={{
                product_list,
                wishlist,
                addToWishlist,
                removeFromWishlist,
                cart,
                addToCart,
                updateCartQuantity,
                removeFromCart,
                url,
                token,
                setToken,
                logout,
                forceUpdate,
                getTotalAmount,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
