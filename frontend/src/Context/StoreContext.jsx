import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
    const [product_list, setProductList] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const [token, setToken] = useState("");
    const [forceUpdate, setForceUpdate] = useState(false);
    const [activeGender, setActiveGender] = useState("Women");
    const [activeCategory, setActiveCategory] = useState("Rings");
    const [userDetails, setUserDetails] = useState(null);

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

    // ✅ Fetch product list once on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${url}/api/auth/jewellery`);
                if (response.status === 200) {
                    setProductList(response.data);
                }
            } catch (error) {
                console.error("Error fetching product list:", error);
            }
        };

        fetchProducts();
    }, []);

    // ✅ Fetch user profile on mount if token exists
    const fetchUserProfile = async () => {
        if (!token) return;

        try {
            const response = await axios.get(`${url}/api/auth/user/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                setUserDetails(response.data);
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserProfile(); // Fetch user details on token change
        }
    }, [token]);

    // ✅ Clear cart after successful payment
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    // ✅ Clear cart & wishlist on logout
    const clearCartAndWishlistOnLogout = () => {
        setWishlist([]);
        setCart([]);
        localStorage.removeItem("wishlist");
        localStorage.removeItem("cart");
    };

    // ✅ Logout & clear session
    const logout = () => {
        setToken("");
        setUserDetails(null);
        clearCartAndWishlistOnLogout();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setForceUpdate((prev) => !prev);
        window.location.href = "/"; // Redirect to homepage after logout
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

    // ✅ Get total amount for the cart
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
                setWishlist,
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
                clearCart,
                activeGender,
                setActiveGender,
                activeCategory,
                setActiveCategory,
                userDetails, // ✅ Added user details to context
                fetchUserProfile, // ✅ Allow profile re-fetching
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
