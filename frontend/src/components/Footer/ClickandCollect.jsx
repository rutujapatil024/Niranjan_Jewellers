import React from "react";
import "./ClickAndCollect.css";

const ClickAndCollect = () => {
  return (
    <div className="click-and-collect">
      <h1>Click and Collect Policy</h1>
      <h2>Niranjan Jewellers</h2>
      
      <p className="policy-intro">
        At <strong>Niranjan Jewellers</strong>, we offer a convenient <strong>Click and Collect</strong> service, allowing you to purchase your favorite jewellery online and collect it from our store at your convenience.
      </p>

      <h3>How It Works:</h3>
      <ol className="steps-list">
        <li><strong>Select Your Jewellery</strong> – Browse our collection and add your desired items to the cart.</li>
        <li><strong>Choose Click and Collect</strong> – At checkout, select the 'Click and Collect' option.</li>
        <li><strong>Pay 50% Online</strong> – Secure your order by paying 50% of the total amount online.</li>
        <li><strong>Receive Confirmation</strong> – You will receive an order confirmation call with details about your purchase and pickup instructions.</li>
        <li><strong>Collect from Store</strong> – Visit our store with the payment confirmation and a valid ID to complete the remaining 50% payment and collect your jewellery.</li>
      </ol>

      <h3>Important Information:</h3>
      <ul className="info-list">
        <li>The remaining balance must be paid in full at the time of collection.</li>
        <li>Please bring a valid ID and the order confirmation message for verification.</li>
        <li>Orders must be collected within <strong>10 days</strong> from the purchase date.</li>
        <li>If the order is not collected within the specified time, it may be subject to cancellation as per our refund policy.</li>
        <li>For order cancellations or modifications, please contact our support team at <br/><strong>98679 32282, 77180 69999</strong>.</li>
      </ul>
      
      <p className="thank-you">Thank you for choosing <strong>Click and Collect</strong> at <strong>Niranjan Jewellers</strong>!</p>
    </div>
  );
};

export default ClickAndCollect;
