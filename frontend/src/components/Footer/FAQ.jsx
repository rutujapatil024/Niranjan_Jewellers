import React, { useState } from "react";
import "./FAQ.css";

const faqData = [
  { question: "What payment methods are accepted by Niranjan?", answer: "We accept cash, net banking, debit cards, mobile banking, and various digital payment options." },
  { question: "Do you offer EMI schemes for jewellery purchases?", answer: "Yes, we provide flexible EMI options on select purchases. Contact our support for more details." },
  { question: "Can I order customized jewellery?", answer: "Absolutely! We offer bespoke jewellery customization. Share your design ideas, and we'll craft them for you." },
  { question: "How can I verify the authenticity of the jewellery?", answer: "All our jewellery comes with a hallmark certification ensuring purity and authenticity." },
  { question: "Does Niranjan buy old jewellery?", answer: "Yes, we do! Bring your old jewellery for evaluation, and we offer the best market value." },
  { question: "What metals and gemstones do you offer?", answer: "We offer gold, silver, platinum, and a variety of gemstones, including diamonds, rubies, and sapphires." },
  { question: "How do I take care of my jewellery?", answer: "Store in a soft cloth pouch, avoid direct contact with perfumes, and clean with a soft brush and mild soap." },
  { question: "Do you provide a warranty on jewellery?", answer: "Yes, we provide a warranty covering manufacturing defects. Terms vary per product." },
  { question: "What is your return and exchange policy?", answer: "We offer a hassle-free return/exchange policy within 7 days of purchase, subject to terms and conditions." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {item.question}
              <span className="faq-toggle">{openIndex === index ? "−" : "+"}</span>
            </div>
            {openIndex === index && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
