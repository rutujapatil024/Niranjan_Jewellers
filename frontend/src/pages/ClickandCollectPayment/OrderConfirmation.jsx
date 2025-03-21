import React, { useContext } from 'react';
import { jsPDF } from 'jspdf';
import { StoreContext } from '../../Context/StoreContext';
import { useLocation } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
    const location = useLocation();
    const state = location.state || {};
    const { customerName, customerPhone } = state;
    const { cart, getTotalAmount } = useContext(StoreContext);
    const cartAmount = getTotalAmount();
    const makingCharges = cartAmount * 0.10;
    const sgst = cartAmount * 0.015;
    const cgst = cartAmount * 0.015;
    const finalAmount = cartAmount + makingCharges + sgst + cgst;
    const advancePaid = finalAmount * 0.50;
    const remainingBalance = finalAmount - advancePaid;

    
    // Get current date & time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    const handleDownload = () => {
        const doc = new jsPDF();

        // Order Confirmation Title - Rich Gold
        doc.setTextColor(184, 134, 11); // #b8860b (Rich Gold)
        doc.setFontSize(18);
        doc.text("Order Confirmation", 70, 20);

        // Niranjan Jewellers - Dark Gold
        doc.setTextColor(139, 101, 8); // #8b6508 (Dark Gold)
        doc.setFontSize(15);
        doc.text("Niranjan Jewellers", 20, 30);

        // Store Details (Black)
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text("Shop No-9, Gagangiri Soc., Pakhadi, Kharigaon, Kalwa (W), Maharashtra - 400605", 20, 40);

        // Order Date & Time
        doc.setFontSize(12);
        doc.text(`Date: ${formattedDate}`, 20, 50);
        doc.text(`Time: ${formattedTime}`, 20, 58);

        // // Customer Details
        // doc.text(`Customer Name: ${customerName || 'N/A'}`, 20, 68);
        // doc.text(`Phone: ${customerPhone || 'N/A'}`, 20, 76);

        // Table Header (Soft Gold)
        doc.setFillColor(230, 194, 122); // #e6c27a
        doc.setTextColor(255, 255, 255);
        doc.rect(20, 86, 170, 10, 'F');
        doc.text("Product Name", 25, 93);
        doc.text("Price", 80, 93);
        doc.text("Making Charges", 105, 93);
        doc.text("SGST", 140, 93);
        doc.text("CGST", 165, 93);

        doc.setTextColor(0, 0, 0);

        let y = 103;
        cart.forEach((item, index) => {
            // Light Golden Alternating Rows
            if (index % 2 === 0) {
                doc.setFillColor(249, 241, 220); // #f9f1dc
                doc.rect(20, y - 7, 170, 10, 'F');
            }

            doc.text(item.name, 25, y);
            doc.text(`Rs. ${item.price.toFixed(2)}`, 80, y);
            doc.text(`Rs. ${(item.price * 0.10).toFixed(2)}`, 110, y);
            doc.text(`Rs. ${(item.price * 0.015).toFixed(2)}`, 140, y);
            doc.text(`Rs. ${(item.price * 0.015).toFixed(2)}`, 165, y);
            y += 10;
        });

        // Adjust Box Border for Total, Advance, Remaining Balance (with Proper Padding & Alignment)
        y += 10;
        const boxX = 20; // Aligning with table start
        const boxWidth = 170; // Matching table width
        const boxHeight = 40; // Increased height for more spacing

        doc.setDrawColor(184, 134, 11); // Gold Border
        doc.rect(boxX, y - 7, boxWidth, boxHeight); // Aligning with table width

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Total: Rs. ${finalAmount.toFixed(2)}`, boxX + 5, y + 3);
        doc.text(`Advance Paid (50%): Rs. ${advancePaid.toFixed(2)}`, boxX + 5, y + 13);
        doc.text(`Remaining Balance: Rs. ${remainingBalance.toFixed(2)}`, boxX + 5, y + 26); // Shifted Down

        // Click & Collect Policy
        y += 40;
        doc.setFontSize(10);
        doc.text("Click & Collect Policy:", 20, y);
        doc.text("1. Collect your jewellery within 10 days from order date.", 20, y + 7);
        doc.text("2. The remaining balance must be paid at the time of collection.", 20, y + 14);
        doc.text("3. In case of delay beyond 10 days, additional charges may apply.", 20, y + 21);
        doc.text("4. For cancellations or modifications, contact support at 98679 32282 or 77180 69999.", 20, y + 28);

        doc.save("AdvancePayment_Confirmation.pdf");
    };

    return (
        <div className="order-confirmation">
            <h1>Order Placed Successfully!</h1>
            <h2>Advance Amount Paid</h2>
            <h2>Thank you for shopping with Niranjan Jewellers</h2>
            <p>Your order has been confirmed. Please visit our store to collect your jewellery.</p>
            <button className="download-bill" onClick={handleDownload}>Download Bill</button>
        </div>
    );
};

export default OrderConfirmation;