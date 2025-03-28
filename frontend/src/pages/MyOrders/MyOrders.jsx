import React, { useContext, useState, useEffect } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || {}; // ✅ Ensure user data is retrieved

  // ✅ Fetch user orders
  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        console.error("User ID not found in localStorage.");
        return;
      }
      console.log("Fetching orders for user ID:", user.id);
      const response = await axios.post(
        url + "/api/auth/order/userorder",
        { userId: user.id },
        { headers: { token } }
      );

      console.log("API response:", response.data);

      if (response.data.success) {
        const updatedOrders = response.data.orders.map((order) => {
          // ✅ Parse products correctly
          order.products = order.products.map((item) =>
            typeof item === "string" ? JSON.parse(item) : item
          );
          return order;
        });

        setOrders(updatedOrders);
      } else {
        console.error("Error fetching orders:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // ✅ Initial fetch when the component loads
  useEffect(() => {
    if (token && user.id) {
      fetchOrders();
    }
  }, [token, user.id]);

  // ✅ Format date helper function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ✅ Get expected delivery date (+10 days)
  const getExpectedDeliveryDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 10);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {orders.length === 0 ? (
          <p className="empty-message">No orders found</p>
        ) : (
          orders.map((order, index) => {
            return (
              <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon} alt="Parcel Icon" />
                <p className="order-products">
                  {order.products.map((item, idx) => {
                    return `${item.name} x ${item.quantity}${
                      idx !== order.products.length - 1 ? ", " : ""
                    }`;
                  })}
                </p>
                <p>
                  <strong>Total:</strong> Rs. {order.amount.toFixed(2)}
                </p>
                <p>
                  <strong>Items:</strong> {order.products.length}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Payment Type:</strong> <br/>{order.paymentType}
                </p>
                <p>
                  <strong>Order Placed on: </strong>
                  {formatDate(order.date)}
                  <br />
                  <strong>Expected Delivery on: </strong>
                  {getExpectedDeliveryDate(order.date)}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyOrders;
