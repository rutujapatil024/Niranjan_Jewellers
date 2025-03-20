import React, { useContext } from "react";
import "./ClickAndCollectPayment.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Import axios
import { toast } from "react-toastify"; // ✅ Import toast

const ClickAndCollectPayment = () => {
  const { getTotalAmount, cart } = useContext(StoreContext);
  const user = JSON.parse(localStorage.getItem('user')) || {}; // ✅ Ensure user is not null
  const customerData = JSON.parse(localStorage.getItem('customer')) || {}; // ✅ Ensure address is present

  if (!customerData.address || !customerData.city || !customerData.state) {
    console.error("Address data missing!", customerData);
    alert("Address details are missing. Please go back and fill the form.");
    return navigate('/placeorder');
  }

  // Calculate order amounts
  const cartAmount = getTotalAmount();
  const makingCharges = cartAmount * 0.10;
  const sgst = cartAmount * 0.015;
  const cgst = cartAmount * 0.015;
  const finalAmount = cartAmount + makingCharges + sgst + cgst;

  // 50% Advance Payment
  const advancePayment = finalAmount * 0.50;
  const remainingBalance = finalAmount - advancePayment;

  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
        if (!user.id) {
            toast.error("User information missing!");
            return;
        }
        
        if (!customerData) {
            toast.error("Address details missing!");
            return;
        }

        const orderData = new FormData();
        orderData.append("userId", user.id);
        orderData.append("amount", finalAmount);
        orderData.append("paymentType", "Advance Payment");
        orderData.append("advancePaid", advancePayment);
        orderData.append("remainingBalance", remainingBalance);

        // ✅ Append address properly
        orderData.append(
            "address",
            JSON.stringify({
                firstName: customerData.firstName,
                lastName: customerData.lastName,
                address: customerData.address,
                city: customerData.city,
                pincode: customerData.pincode,
                state: customerData.state,
                phone: customerData.phone,
            })
        );

        // ✅ Append products (Fix for undefined JSON error)
        orderData.append(
            "products",
            JSON.stringify(cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                size: item.size,
                image: item.image
            })))
        );

        const response = await axios.post(
            "http://localhost:3001/api/auth/order/advance-payment",
            orderData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.data.success) {
            toast.success("Advance Payment Successful! Your order has been placed.");
            navigate("/order-confirmation");
        } else {
            toast.error("Error placing order. Please try again.");
        }
    } catch (error) {
        console.error("Error placing order:", error);
        toast.error("Server error, please try again later.");
    }
  };

  return (
    <div className="click-and-collect-payment">
      <h1>Click & Collect - Payment</h1>
      <h2>Niranjan Jewellers</h2>
      <p>Please pay 50% of your total amount to confirm your order.</p>

      {/* Payment Details */}
      <div className="payment-details">
        <p>
          <strong>Total Amount:</strong> Rs. {finalAmount.toFixed(2)}
        </p>
        <p>
          <strong>Advance Payment (50%):</strong> Rs. {advancePayment.toFixed(2)}
        </p>
        <p>
          <strong>Remaining Balance:</strong> Rs. {remainingBalance.toFixed(2)}
        </p>
      </div>

      {/* Payment Button */}
      <button className="pay-button" onClick={handlePayment}>
        Pay Rs. {advancePayment.toFixed(2)}
      </button>
    </div>
  );
};

export default ClickAndCollectPayment;
