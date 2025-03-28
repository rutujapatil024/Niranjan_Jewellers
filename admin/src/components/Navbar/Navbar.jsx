import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Remove token
    navigate("/login"); // ✅ Redirect to login
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img
          className="logo"
          src={assets.logo}
          alt="Logo"
          title="Go to Dashboard"
        />
      </Link>
       <p>NIRANJAN JEWELLERS - ADMIN PANEL</p>
      <div className="profile-container" onClick={() => setShowLogout(!showLogout)}>
        <img
          className="profile"
          src={assets.profile_image}
          alt="Profile"
          title="Admin Profile"
        />
        {showLogout && (
          <div className="logout-dropdown" onClick={handleLogout}>
            Logout
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
