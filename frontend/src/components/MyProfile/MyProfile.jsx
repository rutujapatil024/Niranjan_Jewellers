// src/components/MyProfile/MyProfile.js
import React, { useState, useEffect, useContext } from "react";
import "./MyProfile.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const MyProfile = () => {
  const { token, url, setToken } = useContext(StoreContext);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: ""
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${url}/api/auth/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.data) {
          setUser(response.data);
          setNewAddress(response.data.address || {
            street: "",
            city: "",
            state: "",
            pincode: ""
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          setToken("");
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token, url]);

  // ✅ Update address
  const handleUpdateAddress = async () => {
    try {
      const response = await axios.put(
        `${url}/api/auth/user/update-address`,
        { address: newAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setUser(prev => ({
          ...prev,
          address: newAddress
        }));
        setIsEditing(false);
        alert("Address updated successfully!");
      } else {
        alert("Failed to update address.");
      }
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address.");
    }
  };

  // ✅ Handle address input changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Handle loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // ✅ If token is invalid or user not found
  if (!token || !user) {
    return (
      <div className="error-container">
        <h3>Please log in to view your profile.</h3>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-details">
        <div className="profile-item">
          <strong>First Name:</strong> <span>{user.firstName}</span>
        </div>
        <div className="profile-item">
          <strong>Last Name:</strong> <span>{user.lastName}</span>
        </div>
        <div className="profile-item">
          <strong>Phone:</strong> <span>{user.contactNumber}</span>
        </div>
        <div className="profile-item">
          <strong>Email:</strong> <span>{user.email}</span>
        </div>
        <div className="profile-section">
          <h3>Address</h3>
          {isEditing ? (
            <div className="address-form">
              <input
                type="text"
                name="street"
                placeholder="Street Address"
                value={newAddress.street}
                onChange={handleAddressChange}
                className="address-input"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={newAddress.city}
                onChange={handleAddressChange}
                className="address-input"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={newAddress.state}
                onChange={handleAddressChange}
                className="address-input"
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={newAddress.pincode}
                onChange={handleAddressChange}
                className="address-input"
              />
              <div className="profile-actions">
                <button className="save-btn" onClick={handleUpdateAddress}>
                  Save Address
                </button>
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="address-display">
              {user.address ? (
                <>
                  <p><strong>Street:</strong> {user.address.street}</p>
                  <p><strong>City:</strong> {user.address.city}</p>
                  <p><strong>State:</strong> {user.address.state}</p>
                  <p><strong>Pincode:</strong> {user.address.pincode}</p>
                </>
              ) : (
                <p>No address provided</p>
              )}
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit Address
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
