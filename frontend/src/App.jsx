import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home/home';
import Wishlist from './pages/Wishlist/Wishlist';
import PlaceOrder from './pages/PlaceOrder/placeorder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import ItemDetails from './components/ItemDetails/ItemDetails';
import Cart from './pages/Cart/Cart';
import AboutUs from './components/Footer/AboutUs';
import PrivacyPolicy from './components/Footer/PrivacyPolicy';
import ShippingPolicy from './components/Footer/ShippingPolicy';
import RingSize from './components/Footer/RingSize';
import BangleSize from './components/Footer/BangleSize';
import FAQ from './components/Footer/FAQ';
import MyOrders from './pages/MyOrders/MyOrders';
import Categories from './components/Categories/Categories';
import Collections from './components/Collections/Collections';
import ShopByGenderDisplay from "./components/ShopByGender/ShopByGenderDisplay";
import ProductDisplay from './components/ProductDisplay/ProductDisplay';
import ClickandCollect from './components/Footer/ClickandCollect';
import ClickandCollectPayment from './pages/ClickandCollectPayment/ClickandCollectPayment';
import OrderConfirmation from './pages/ClickandCollectPayment/OrderConfirmation';
import FullPayment from './pages/FullPayment/FullPayment';
import FullPaymentConfirmation from './pages/FullPayment/FullPaymentConfirmation';
import MyProfile from './components/MyProfile/MyProfile';

const App = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        
        if (storedToken && storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
        window.location.href = "/"; // Redirect after logout
    };

    return ( 
        <>
            {showLogin && <LoginPopup setShowLogin={setShowLogin} setIsAuthenticated={setIsAuthenticated} setUser={setUser} />}
            <div className='app'>
                <Navbar setShowLogin={setShowLogin} isAuthenticated={isAuthenticated} onLogout={handleLogout} />
                <ToastContainer />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/login" element={<LoginPopup setShowLogin={setShowLogin} setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path='/wishlist' element={<Wishlist />} />
                    <Route path='/placeorder' element={<PlaceOrder />} />
                    <Route path='/categories' element={<Categories />} />
                    <Route path="/item-details/:id" element={<ItemDetails />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
                    <Route path='/shipping-policy' element={<ShippingPolicy/>} />
                    <Route path='/ring-size-guide' element={<RingSize/>} />
                    <Route path='/bangle-size-guide' element={<BangleSize/>} />
                    <Route path='/click-and-collect' element={<ClickandCollect/>} />
                    <Route path='/faq' element={<FAQ/>} />
                    <Route path='/my-orders' element={<MyOrders/>} />
                    <Route path="/my-profile" element={<MyProfile />} />
                    <Route path='/collections' element={<Collections/>} />
                    <Route path="/shop-by-gender" element={<ShopByGenderDisplay />} />
                    <Route path="/products" element={<ProductDisplay product="All" />} />
                    <Route path="/click-and-collect-payment" element={<ClickandCollectPayment/>} />
                    <Route path="/order-confirmation" element={<OrderConfirmation/>} />
                    <Route path="/full-payment" element={<FullPayment/>} />
                    <Route path="/fullpayment-confirmation" element={<FullPaymentConfirmation/>} />
                </Routes>
            </div>
            <Footer />
        </>
    );
};

export default App;
