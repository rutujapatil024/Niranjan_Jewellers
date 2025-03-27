import React, { useContext, useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { StoreContext } from "../../Context/StoreContext";
import { useLocation } from "react-router-dom";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const location = useLocation();
  const state = location.state || {};
  const { cart, getTotalAmount, clearCart } = useContext(StoreContext);

  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
  });

  const cartAmount = getTotalAmount();
  const makingCharges = cartAmount * 0.1;
  const sgst = cartAmount * 0.015;
  const cgst = cartAmount * 0.015;
  const finalAmount = cartAmount + makingCharges + sgst + cgst;
  const advancePaid = finalAmount * 0.5;
  const remainingBalance = finalAmount - advancePaid;

  // ✅ Get customer data from localStorage or passed state
  useEffect(() => {
    const storedCustomer = JSON.parse(localStorage.getItem("customer")) || {};
    setCustomer({
      firstName: state.firstName || storedCustomer.firstName || "N/A",
      lastName: state.lastName || storedCustomer.lastName || "N/A",
      phone: state.phone || storedCustomer.phone || "N/A",
      address: storedCustomer.address || "N/A",
      city: storedCustomer.city || "N/A",
      pincode: storedCustomer.pincode || "N/A",
      state: storedCustomer.state || "N/A",
    });
  }, [state]);

  // Get current date & time
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  const handleDownload = () => {
    const doc = new jsPDF();

    // Order Confirmation Title - Rich Gold
    doc.setTextColor(184, 134, 11);
    doc.setFontSize(18);
    doc.text("Order Confirmation", 70, 20);

    // Niranjan Jewellers - Dark Gold
    doc.setTextColor(139, 101, 8);
    doc.setFontSize(15);
    doc.text("Niranjan Jewellers", 20, 30);

    // Store Details (Black)
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(
      "Shop No-9, Gagangiri Soc., Pakhadi, Kharigaon, Kalwa (W), Maharashtra - 400605",
      20,
      40
    );

    // Order Date & Time
    doc.setFontSize(12);
    doc.text(`Date: ${formattedDate}`, 20, 50);
    doc.text(`Time: ${formattedTime}`, 20, 58);

    // ✅ Customer Details
    doc.text(
      `Customer Name: ${customer.firstName} ${customer.lastName}`,
      20,
      68
    );
    doc.text(`Phone: ${customer.phone}`, 20, 76);
    doc.text(
      `Address: ${customer.address}, ${customer.city}, ${customer.state}, ${customer.pincode}`,
      20,
      84
    );

    // Table Header (Soft Gold)
    doc.setFillColor(230, 194, 122); // #e6c27a
    doc.setTextColor(255, 255, 255);
    doc.rect(20, 96, 170, 10, "F");
    doc.text("Product Name", 25, 103);
    doc.text("Price", 80, 103);
    doc.text("Making Charges", 105, 103);
    doc.text("SGST", 140, 103);
    doc.text("CGST", 165, 103);

    doc.setTextColor(0, 0, 0);

    let y = 113;
    cart.forEach((item, index) => {
      // Light Golden Alternating Rows
      if (index % 2 === 0) {
        doc.setFillColor(249, 241, 220); // #f9f1dc
        doc.rect(20, y - 7, 170, 10, "F");
      }

      doc.text(item.name, 25, y);
      doc.text(`Rs. ${item.price.toFixed(2)}`, 80, y);
      doc.text(`Rs. ${(item.price * 0.1).toFixed(2)}`, 110, y);
      doc.text(`Rs. ${(item.price * 0.015).toFixed(2)}`, 140, y);
      doc.text(`Rs. ${(item.price * 0.015).toFixed(2)}`, 165, y);
      y += 10;
    });

    // Box Border for Total, Advance, and Remaining Balance
    y += 10;
    const boxX = 20;
    const boxWidth = 170;
    const boxHeight = 40;

    doc.setDrawColor(184, 134, 11); // Gold Border
    doc.rect(boxX, y - 7, boxWidth, boxHeight);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Total: Rs. ${finalAmount.toFixed(2)}`, boxX + 5, y + 3);
    doc.text(`Advance Paid (50%): Rs. ${advancePaid.toFixed(2)}`, boxX + 5, y + 13);
    doc.text(`Remaining Balance: Rs. ${remainingBalance.toFixed(2)}`, boxX + 5, y + 26);

    // Click & Collect Policy
    y += 40;
    doc.setFontSize(10);
    doc.text("Click & Collect Policy:", 20, y);
    doc.text("1. Collect your jewellery within 10 days from order date.", 20, y + 7);
    doc.text(
      "2. The remaining balance must be paid at the time of collection.",
      20,
      y + 14
    );
    doc.text(
      "3. In case of delay beyond 10 days, additional charges may apply.",
      20,
      y + 21
    );
    doc.text(
      "4. For cancellations or modifications, contact support at 98679 32282 or 77180 69999.",
      20,
      y + 28
    );

    // Save PDF and Clear Cart
    doc.save("AdvancePayment_Confirmation.pdf");
    clearCart(); // ✅ Clear cart from StoreContext
    localStorage.removeItem("cart"); // ✅ Clear cart from local storage
  };

  return (
    <div className="order-confirmation">
      <h1>Order Placed Successfully!</h1>
      <h2>Advance Amount Paid</h2>
      <h2>Thank you for shopping with Niranjan Jewellers</h2>
      <p>Your order has been confirmed. Please visit our store to collect your jewellery.</p>
      <button className="download-bill" onClick={handleDownload}>
        Download Bill
      </button>
    </div>
  );
};

export default OrderConfirmation;
