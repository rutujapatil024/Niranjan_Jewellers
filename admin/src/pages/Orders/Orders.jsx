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
        setOrders(response.data.orders);
        console.log(response.data.orders);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  // Update order status
  const statusHandler = async (event, orderId) => {
    const statusdata = new FormData();
    statusdata.append("orderId", orderId);
    statusdata.append("status", event.target.value);

    try {
      const response = await axios.post("http://localhost:3001/api/auth/order/update", statusdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
       
      );
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
      {orders?.length === 0 ? (
        <p className="empty-message">No orders available</p>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => {
            // ✅ Parse address if it's a string
            const address = typeof order.address === "string" ? JSON.parse(order.address) : order.address;

            return (
              <div key={index} className="order-item">
                <img src={assets.parcel_icon} alt="Order Icon" />
                <div>
                  {/* Display product names and quantities */}
                  <p className="order-item-jewel">
                    {order.products.map((itemString, idx) => {
                      // ✅ Parse product string into object
                      const item = typeof itemString === "string" ? JSON.parse(itemString) : itemString;
                      return idx === order.products.length - 1
                        ? `${item.name} X ${item.quantity}`
                        : `${item.name} X ${item.quantity}, `;
                    })}
                  </p>
                  {
                    address && (
                      <div>
                        <p className="order-item-name">
                          {address?.firstName + " " + address?.lastName}
                        </p>
                        <div className="order-item-address">
                          <p>{address?.address + ","}</p>
                          <p>
                            {address?.city + ", " + address?.pincode + ", " + address?.state}
                          </p>
                        </div>
                        <p className="order-item-phone">{address?.phone}</p>
                      </div>
                    )
                  }
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
                  <option value="Paid & Collected">Paid & Collected</option>
                </select>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
