import React, { useContext, useEffect } from "react";
import { jsPDF } from "jspdf";
import { StoreContext } from "../../Context/StoreContext";
import { useLocation } from "react-router-dom";
import "./FullPaymentConfirmation.css";

const FullPaymentConfirmation = () => {
  const location = useLocation();
  const state = location.state || {};
  const { firstName, lastName, phone } = state;
  const { cart, getTotalAmount, clearCart } = useContext(StoreContext);

  const cartAmount = getTotalAmount();
  const makingCharges = cartAmount * 0.1;
  const sgst = cartAmount * 0.015;
  const cgst = cartAmount * 0.015;
  const finalAmount = cartAmount + makingCharges + sgst + cgst;

  // Get current date & time
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  const handleDownload = () => {
    const doc = new jsPDF();

    // Title and Header
    doc.setTextColor(184, 134, 11);
    doc.setFontSize(18);
    doc.text("Order Confirmation", 70, 20);

    doc.setTextColor(139, 101, 8);
    doc.setFontSize(15);
    doc.text("Niranjan Jewellers", 20, 30);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(
      "Shop No-9, Gagangiri Soc., Pakhadi, Kharigaon, Kalwa (W), Maharashtra - 400605",
      20,
      40
    );

    doc.setFontSize(12);
    doc.text(`Date: ${formattedDate}`, 20, 50);
    doc.text(`Time: ${formattedTime}`, 20, 58);

    doc.text(`Customer Name: ${firstName || "N/A"} ${lastName || "N/A"}`, 20, 68);
    doc.text(`Phone: ${phone || "N/A"}`, 20, 76);

    // Table Headers
    let y = 90;
    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text("Product Name", 20, y);
    doc.text("Price", 80, y);
    doc.text("Making Charges", 110, y);
    doc.text("SGST", 140, y);
    doc.text("CGST", 165, y);

    y += 10;
    doc.setFont(undefined, "normal");

    // Table Content
    cart.forEach((item) => {
      doc.text(item.name, 20, y);
      doc.text(`Rs. ${item.price.toFixed(2)}`, 80, y);
      doc.text(`Rs. ${(item.price * 0.1).toFixed(2)}`, 110, y);
      doc.text(`Rs. ${(item.price * 0.015).toFixed(2)}`, 140, y);
      doc.text(`Rs. ${(item.price * 0.015).toFixed(2)}`, 165, y);
      y += 10;
    });

    // Total Amount
    y += 5;
    doc.setFont(undefined, "bold");
    doc.text(`Total Amount Paid: Rs. ${finalAmount.toFixed(2)}`, 20, y + 10);

    // Shipping Policy Footer
    y += 20;
    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    doc.text("Shipping Policy:", 20, y);
    doc.text("1. Provide accurate recipient details for hassle-free delivery.", 20, y + 5);
    doc.text(
      "2. Accepted ID proofs: Passport, PAN, Driver's License, Voter ID, Aadhar.",
      20,
      y + 10
    );
    doc.text(
      "3. Inspect package upon delivery. Report damage within 24 hours.",
      20,
      y + 15
    );
    doc.text("4. Contact: +91 98679 32282 | +91 77180 69999", 20, y + 20);

    // Save PDF and Clear Cart
    doc.save("FullPayment_Confirmation.pdf");
    clearCart();
  };

  return (
    <div className="order-confirmation">
      <h1>Order Placed Successfully!</h1>
      <h2>Thank you for shopping with Niranjan Jewellers</h2>
      <p>Your order has been confirmed with full payment.</p>
      <button className="download-bill" onClick={handleDownload}>
        Download Bill
      </button>
    </div>
  );
};

export default FullPaymentConfirmation;
