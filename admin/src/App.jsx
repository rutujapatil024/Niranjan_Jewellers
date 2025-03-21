// /src/App.jsx
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route, useLocation } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Dashboard from "./components/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";

const App = () => {
  const url = "http://localhost:3001";
  const location = useLocation();

  // ✅ Check if we should hide Dashboard when visiting specific routes
  const hideDashboard = ["/add", "/list", "/orders"].includes(location.pathname);

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content" style={{ display: "flex" }}>
        <Sidebar /> {/* ✅ Sidebar always visible */}
        <div className="main-content" style={{ flex: 1, padding: "20px" }}>
          <Routes>
            {/* ✅ Render Dashboard only at "/" */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
