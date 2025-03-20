import React, { useContext } from "react";
import "./ClickAndCollectPayment.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Import axios
import { toast } from "react-toastify"; // ✅ Import toast

const ClickAndCollectPayment = () => {
  const { getTotalAmount,  cart } = useContext(StoreContext);
  const user = JSON.parse(localStorage.getItem('user'));
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

  const handlePayment = async () => {
    try {
      const orderData = new FormData();

      // ✅ Add user and order details
      orderData.append("userId", user.id);
      orderData.append("amount", finalAmount);
      orderData.append("paymentType", "Advance Payment");
      orderData.append("advancePaid", advancePayment);
      orderData.append("remainingBalance", remainingBalance);

      // ✅ Add address (stringified)
      orderData.append(
        "address",
        JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          city: user.city,
          pincode: user.pincode,
          state: user.state,
          phone: user.phone,
        })
      );

      // ✅ Add products array (stringified)
      const products = cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        image: item.image,
      }));
      orderData.append("products", JSON.stringify(products));

      // ✅ Send data to backend
      const response = await axios.post(
        "http://localhost:3001/api/auth/order/advance-payment",
        orderData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // ✅ Handle response
      if (response.data.success) {
        toast.success("Advance Payment Successful! Your order has been placed.");
        navigate("/order-confirmation"); // Redirect to order confirmation page
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
