import React, { useState, useEffect } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders from API
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/auth/order/allorders");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  // Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "api/order/status", {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order-add">
      <h3>Order Page</h3>

      {/* Check if orders exist */}
      {orders?.length === 0 || orders === undefined ? (
        <p className="empty-message">No orders available</p>
      ) : (
        <div className="order-list">
          {orders?.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="Order Icon" />
              <div>
                {/* Display product names and quantities */}
                <p className="order-item-jewel">
                  {order.products.map((item, idx) =>
                    idx === order.products.length - 1
                      ? `${item.name} X ${item.quantity}`
                      : `${item.name} X ${item.quantity}, `
                  )}
                </p>
                {/* Display customer's name */}
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                {/* Display customer's address */}
                <div className="order-item-address">
                  <p>{order.address.address + ","}</p>
                  <p>
                    {order.address.city + ", " + order.address.pincode + ", " + order.address.state}
                  </p>
                </div>
                {/* Display customer's phone */}
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              {/* Order details */}
              <p>Items: {order.products.length}</p>
              <p>Rs. {order.amount}</p>
              <p>Payment Type: {order.paymentType}</p>
              {order.paymentType === "Advance Payment" && (
                <>
                  <p>Advance Paid: Rs. {order.advancePaid}</p>
                  <p>Remaining Balance: Rs. {order.remainingBalance}</p>
                </>
              )}
              {/* Status update dropdown */}
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Ordered">Ordered</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
