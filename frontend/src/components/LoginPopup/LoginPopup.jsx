import React, { useState, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import { Link } from "react-router-dom";

const LoginPopup = ({ setShowLogin, setIsAuthenticated, setUser }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login"); // "Login" or "Sign Up"
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // ✅ State for Error Message

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "firstName" || name === "lastName") && /[0-9]/.test(value)) {
      return; // Don't update state if numeric value is found
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleNumericInput = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      handleChange(e);
    }
  };

  const validate = () => {
    if (currState === "Sign Up") {
      if (!/^[A-Za-z]+$/.test(formData.firstName.trim())) {
        setErrorMessage("Enter a valid First name");
        return false;
      }
      if (!/^[A-Za-z]+$/.test(formData.lastName.trim())) {
        setErrorMessage("Enter a valid Last name");
        return false;
      }
      if (!/^\d{10}$/.test(formData.contactNumber)) {
        setErrorMessage("Enter a valid contact number");
        return false;
      }
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
        setErrorMessage("Invalid email address");
        return false;
      }
      if (formData.password.length < 8) {
        setErrorMessage("Password must be at least 8 characters");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match");
        return false;
      }
    } else if (currState === "Login") {
      if (!/^\d{10}$/.test(formData.contactNumber)) {
        setErrorMessage("Contact number must be exactly 10 digits");
        return false;
      }
      if (formData.password.length < 8) {
        setErrorMessage("Password must be at least 8 characters");
        return false;
      }
    }
    setErrorMessage(""); // ✅ Clear error if validation passes
    return true;
  };

  const handleLoginSuccess = (userToken, user) => {
    setToken(userToken);
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(user));
    setShowLogin(false);
    window.location.href = "/"; // ✅ Redirect after login
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const url =
        currState === "Login"
          ? "http://localhost:3001/api/auth/login"
          : "http://127.0.0.1:3001/api/auth/register";

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Server Response:", response.data); // Debugging Step

      if (response.data.success) {
        handleLoginSuccess(response.data.token, response.data.user);
      } else {
        setErrorMessage(response.data.message || "Login/Sign up failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage( (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>

        {/* ✅ Error message block */}
        {errorMessage && (
          <div className="error-alert">
            <p>{errorMessage}</p>
          </div>
        )}

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="contactNumber"
                placeholder="Contact number"
                value={formData.contactNumber}
                onChange={handleNumericInput}
                maxLength={10}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </>
          )}
          {currState === "Login" && (
            <>
              <input
                type="text"
                name="contactNumber"
                placeholder="Contact number"
                value={formData.contactNumber}
                onChange={handleNumericInput}
                maxLength={10}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                required
              />
            </>
          )}
        </div>
        {currState === "Sign Up" && (
          <div className="login-popup-condition">
            <input type="checkbox" required /> By continuing, I agree to the
            terms of use &{" "}
            <Link
              to="/privacy-policy"
              className="privacy-link"
              onClick={() => setShowLogin(false)}
            >
              Privacy Policy
            </Link>
            .
          </div>
        )}
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div>
          {currState === "Login" ? (
            <p>
              <b>Don't have an account?</b>{" "}
              <span onClick={() => setCurrState("Sign Up")}>Sign up here</span>
            </p>
          ) : (
            <p>
              <b>Already have an account?</b>{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
