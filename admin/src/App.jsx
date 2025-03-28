// /src/App.jsx
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Dashboard from "./components/Dashboard/Dashboard";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => {
  const url = "http://localhost:3001";
  const location = useLocation();

  // ✅ Check if user is authenticated
  const isAuthenticated = !!localStorage.getItem("token");

  // ✅ Hide Sidebar and Navbar on login page
  const hideDashboard = location.pathname === "/login";

  // ✅ Private Route Component for Protected Routes
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" replace />;
  };

  return (
    <div>
      <ToastContainer />
      {!hideDashboard && <Navbar />}
      <hr />
      <div className="app-content" style={{ display: "flex" }}>
        {!hideDashboard && <Sidebar />}
        <div className="main-content" style={{ flex: 1, padding: "20px" }}>
          <Routes>
            {/* ✅ Public Route for Admin Login */}
            <Route path="/login" element={<AdminLogin />} />

            {/* ✅ Protected Routes */}
            <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/add" element={<PrivateRoute element={<Add url={url} />} />} />
            <Route path="/list" element={<PrivateRoute element={<List url={url} />} />} />
            <Route path="/orders" element={<PrivateRoute element={<Orders url={url} />} />} />

            {/* ✅ Redirect all unknown paths to login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
