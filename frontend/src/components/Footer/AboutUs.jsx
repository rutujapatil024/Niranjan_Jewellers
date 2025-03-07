import React from "react";
import "./AboutUs.css"; // Add styles here

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <h2>Niranjan Jewellers</h2>
      <p className="established">Established in 2012</p>

      <p className="about-text">
        At <strong>Niranjan Jewellers</strong>, we take pride in crafting timeless pieces that embody elegance, tradition, and craftsmanship. Since our inception in 2012, we have been dedicated to offering our customers the finest jewellery collections, combining exquisite designs with unmatched quality.
      </p>

      <h3>Our Commitment</h3>
      <ul className="commitment-list">
        <li><strong>Gold Jewellery</strong> – Traditional and contemporary designs to suit every occasion.</li>
        <li><strong>Platinum Jewellery</strong> – Elegant and durable pieces for a touch of luxury.</li>
        <li><strong>Silver Jewellery</strong> – Beautifully crafted silver ornaments with intricate detailing.</li>
        <li><strong>Gemstone Jewellery</strong> – Vibrant and unique pieces featuring precious and semi-precious stones.</li>
      </ul>


      <h3>Our Services</h3>
      <ul className="services-list">
        <li>✅ <strong>Shop In Store</strong> – Visit our showroom and explore our exquisite collection.</li>
        <li>✅ <strong>Delivery Available</strong> – Safe and secure delivery at your doorstep.</li>
        <li>✅ <strong>Loyalty Programs</strong> – Earn rewards and exclusive benefits on every purchase.</li>
        <li>✅ <strong>Making Charges</strong> – Transparent pricing with competitive making charges.</li>
      </ul>

      <h3>Visit Us Today!</h3>
      <p className="contact-info">
        📞 <strong>Contact Us:<br></br></strong> 98679 32282 <br></br>
        77180 69999 <br />

      </p>
    </div>
  );
};

export default AboutUs;
