import React from "react";
import "./ShippingPolicy.css"; // Add styles here

const ShippingPolicy = () => {
  return (
    <div className="shipping-policy">
      <h1>Shipping Policy</h1>
      <p className="effective-date"><strong>Effective Date: 2025</strong></p>

      <p>
        At <strong>Niranjan Jewellers</strong>, we ensure a seamless and secure delivery experience for our customers. Please review our shipping policies below.
      </p>

      <h3>Delivery to Identified Person</h3>
      <p>
        Customers are required to provide accurate details of the consignee/recipient’s name (as stated in their government-issued photo identification) along with the complete address, nearby landmark, pin code, and contact number for hassle-free delivery.
      </p>

      <p><strong>Accepted Identity Proofs for Delivery:</strong></p>
      <ul>
        <li>✅ Passport</li>
        <li>✅ PAN Card</li>
        <li>✅ Driver's License</li>
        <li>✅ Voter's ID</li>
        <li>✅ Aadhar Card</li>
      </ul>

      <p>
        To ensure safe and secure delivery, the courier agent will verify the recipient’s identity by checking the provided original copies of the identity proof. The courier agent will note down the details of the recipient’s identity proof during the delivery process. Cooperation from the receiver is expected during this verification process.
      </p>

      <h3>Damaged or Missing Products</h3>
      <p>
        In the rare event that you receive a damaged or incorrect product, please follow these steps:
      </p>
      <ul>
        <li>☑️ <b>Check the package:</b> Inspect the product upon delivery.</li>
        <li>📸 <b>Take pictures:</b> Capture clear images of the damaged/missing item.</li>
        <li>📩 <b>Contact us immediately:</b> Report the issue within **24 hours** of delivery.</li>
        <li>🔄 <b>Return & Replacement:</b> We will initiate a replacement or refund after verification.</li>
      </ul>

      <p>
        Our goal is to ensure a smooth and satisfactory shopping experience. If you have any concerns regarding shipping or delivery, please feel free to reach out.
      </p>

      <h3>Contact Us</h3>
      <p>
        📞 <strong>Phone:</strong> +91 98679 32282 <br></br> +91 77180 69999 <br /> <br />    
      </p>
    </div>
  );
};

export default ShippingPolicy;
