import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom';
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
import Categories from './components/Categories/Categories'
import Collections from './components/Collections/Collections'
import ShopByGenderDisplay from "./components/ShopByGender/ShopByGenderDisplay";
import ProductDisplay from './components/ProductDisplay/ProductDisplay'

const App = () => {
    const [showLogin, setShowLogin] = useState(false);
    

    return ( 
        <>
            {showLogin && <LoginPopup setShowLogin={setShowLogin}/>}
            <div className='app'>
                <Navbar setShowLogin={setShowLogin} />
                <Routes>
                    
                    <Route path='/' element={<Home />} />
                    <Route path="/login" element={<LoginPopup />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path='/wishlist' element={<Wishlist />} />
                    <Route path='/placeorder' element={<PlaceOrder />} />
                    <Route path='/placeorder' element={<Categories />} />
                    <Route path="/item-details/:id" element={<ItemDetails />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
                    <Route path='/shipping-policy' element={<ShippingPolicy/>} />
                    <Route path='/ring-size-guide' element={<RingSize/>} />
                    <Route path='/bangle-size-guide' element={<BangleSize/>} />
                    <Route path='/faq' element={<FAQ/>} />
                    <Route path='/my-orders' element={<MyOrders/>} />
                    <Route path='/collections' element={<Collections/>} />
                    <Route path="/shop-by-gender" element={<ShopByGenderDisplay />} />
                    <Route path="/products" element={<ProductDisplay product="All" />} />

                </Routes>
            </div>
            <Footer />
            
        </>
    );
};

export default App;
