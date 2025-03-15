import React from 'react';
import { assets } from "../../assets/assets";
import './BangleSize.css'

const BangleSize = () => {
  return (
    <div>
      <h2>Bangle Size Guide</h2>
      <p><strong>BANGLE CHART BASIC GUIDE.</strong></p>
      <img className='pic1' src={assets.banglesize} />
      <p>
        If you already have a bangle, please measure the inside diameter and compare with the below measurement chart.
      </p>

      <table border="1" style={{ marginLeft: '100px', width: '60%', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr >
            <th>Bangle Size</th>
            <th>Diameter (Inches)</th>
            <th>Diameter (Centimeters)</th>
            <th>Circumference (Inches)</th>
          </tr>
        </thead>
        <tbody>
          {[
            { size: '2-2', inches: 2.125, cm: 5.4, circumference: 6.67 },
            { size: '2-4', inches: 2.25, cm: 5.7, circumference: 7.06 },
            { size: '2-6', inches: 2.375, cm: 6, circumference: 7.46 },
            { size: '2-8', inches: 2.5, cm: 6.5, circumference: 7.85 },
            { size: '2-10', inches: 2.625, cm: 6.7, circumference: 8.24 },
            { size: '2-12', inches: 2.75, cm: 7, circumference: 8.64 },
          ].map((row, index) => (
            <tr key={index}>
              <td>{row.size}</td>
              <td>{row.inches}</td>
              <td>{row.cm}</td>
              <td>{row.circumference}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bangle-size-container">
        <div className="bangle-text">
          <h3>TO DETERMINE YOUR BANGLE SIZE</h3>
          <p>This is a chart that will be extremely helpful for you to determine the bangle size that you need.</p>
          <h4>STEP 1:</h4>
          <p>Close your fingers together and bring your thumb to your little finger (as pictured). Pretend that you were putting on a bangle.</p>
          <h4>STEP 2:</h4>
          <p>Using a strip of paper or tape measurement, wrap it around your hand at the widest point. Mark the size, then measure the strip with a ruler.</p>
          <h4>STEP 3:</h4>
          <p>Compare your hand circumference to the chart above. Purchase a bangle with a diameter that is the next size up from your actual hand measurement.</p>
        </div>
        <img className="pic2" src={assets.banglesize2} />
      </div>

      <h3>Tips for buying bangles:</h3>
      <ul>
        <li>It is always recommended to buy bangles that are a bit larger (1/2 to 3/4 inches) than your wrist size.</li>
        <li>Use silk or crepe material while wearing bangles to slide them easily.</li>
        <li>If unsure about your size, opt for openable bangles as they are adjustable.</li>
        <li>For diamond bangles, ensure high-quality diamonds with a durable setting.</li>
        <li>Store gold bangles in a proper box to maintain their shape and protect them from damage.</li>
      </ul>
    </div>
  );
};

export default BangleSize;