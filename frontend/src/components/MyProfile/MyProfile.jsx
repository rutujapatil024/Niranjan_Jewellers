// src/components/MyProfile/MyProfile.js
import React, { useState, useEffect, useContext } from "react";
import "./MyProfile.css";
import { StoreContext } from "../../Context/StoreContext";

const MyProfile = () => {
  const { token, url } = useContext(StoreContext);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/auth/user/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setNewAddress(data.address || "");
        } else {
          console.error("Failed to fetch user profile.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
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
      const response = await fetch(`http://localhost:3001/api/user/update-address`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ address: newAddress }),
      });

      if (response.ok) {
        alert("Address updated successfully!");
        setUser({ ...user, address: newAddress });
        setIsEditing(false);
      } else {
        alert("Failed to update address.");
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
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
        <div className="profile-item">
          <strong>Address:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              className="address-input"
            />
          ) : (
            <span>{user.address || "No address provided"}</span>
          )}
        </div>
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button className="save-btn" onClick={handleUpdateAddress}>
                Save Address
              </button>
              <button
                className="cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit Address
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
