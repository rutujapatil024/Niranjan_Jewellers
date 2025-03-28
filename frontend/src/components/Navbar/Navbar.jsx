import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setShowLogin }) => {
  const [activeNavbar, setActiveNavbar] = useState("Navbar");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const { cart } = useContext(StoreContext); // ✅ Destructure cart
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
    setTimeout(() => window.location.reload(), 100);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="Navbar">
      <Link to="/">
        <img src={assets.nlogobg} alt="Logo" className="logo" />
      </Link>
      <div className="hallmark">
        <img src={assets.hallmark} alt="Hallmark Logo" />
      </div>
      <ul className="navbar-head">
        <Link to="/" onClick={() => setActiveNavbar("Home")} className={activeNavbar === "Home" ? "active" : ""}>
          Home
        </Link>
        <a href="/#categories" onClick={() => setActiveNavbar("Shop now")} className={activeNavbar === "Shop now" ? "active" : ""}>
          Shop now
        </a>
        <a href="/collections" onClick={() => setActiveNavbar("Collections")} className={activeNavbar === "Collections" ? "active" : ""}>
          Collections
        </a>
        <a href="#footer" onClick={() => setActiveNavbar("Contact us")} className={activeNavbar === "Contact us" ? "active" : ""}>
          Contact us
        </a>
      </ul>

      <div className="navbar-right">
        <div className='profile'>
          {isAuthenticated ? (
            <>
              <img src={assets.profile} alt="Profile" className="profile-icon" />
              <ul className='nav-profile-dropdown'>
                <Link to="/my-profile">
                  <img src={assets.profile} alt="Profile" />
                  <p>My Profile</p>
                </Link>
                <hr />
                <Link to="/my-orders">
                  <img src={assets.myorders} alt="" />
                  <p>My Orders</p>
                </Link>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </>
          ) : (
            <button onClick={() => setShowLogin(true)} className="signup-button">
              Sign in
            </button>
          )}
        </div>
        <div className="navbar-wishlist-icon">
          <Link to="/Wishlist">
            <img src={assets.wishlist} alt="Wishlist" />
          </Link>
          <div className="navbar-cart-icon">
  <Link to="/cart">
    <img src={assets.cart} alt="Cart" />
    {cart.length > 0 && <span className="cart-count">{cart.length}</span>} {/* Show count here */}
  </Link>
</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
