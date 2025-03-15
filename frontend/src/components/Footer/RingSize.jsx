import React from 'react';
import { assets } from "../../assets/assets";
import './RingSize.css'

const RingSize = () => {
  return (
    <div>
      <h2>Ring Size Guide</h2>
      <p><strong>RING SIZING CHART FOR MEASURING YOUR FINGER SIZE APPROPRIATELY</strong></p>
      <p>
        1. This is a chart that will be extremely helpful for you to determine the ring size that you need.
        You can either make use of a tape or a small piece of string to measure the area that will be occupied by the ring.
        When it becomes a complete circle, make a mark on such string. This will be helpful for you to compare with the
        chart that is mentioned below. For extra width, you can add another size to accommodate.
      </p>
      <div className='imgs'>
      <img src={assets.ring_guide1}/>
      <img src={assets.ring_guide2}/>
      </div>
      <div className='table' style={{ display: 'flex', justifyContent: 'space-between' }}>
        
        <table border="1" style={{ width: '45%', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr>
              <th>Ring Size (Indian)</th>
              <th>Circumference (Inches)</th>
              <th>Circumference (MM)</th>
            </tr>
          </thead>
          <tbody>
            {[  
              { size: 1, inches: 1.61, mm: 41.01 },
              { size: 2, inches: 1.64, mm: 42.70 },
              { size: 3, inches: 1.69, mm: 42.90 },
              { size: 4, inches: 1.72, mm: 43.60 },
              { size: 5, inches: 1.76, mm: 44.80 },
              { size: 6, inches: 1.81, mm: 46.10 },
              { size: 7, inches: 1.87, mm: 47.40 },
              { size: 8, inches: 1.89, mm: 48.00 },
              { size: 9, inches: 1.92, mm: 48.70 },
              { size: 10, inches: 1.97, mm: 50.00 },
              { size: 11, inches: 2.02, mm: 51.20 },
              { size: 12, inches: 2.04, mm: 51.90 },
              { size: 13, inches: 2.09, mm: 53.10 },
              { size: 14, inches: 2.14, mm: 54.40 },
              { size: 15, inches: 2.16, mm: 55.10 },
            ].map((row) => (
              <tr key={row.size}>
                <td>{row.size}</td>
                <td>{row.inches}</td>
                <td>{row.mm}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <table border="1" style={{ width: '45%', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr>
              <th>Ring Size (Indian)</th>
              <th>Circumference (Inches)</th>
              <th>Circumference (MM)</th>
            </tr>
          </thead>
          <tbody>
            {[  
              { size: 16, inches: 2.22, mm: 56.30 },
              { size: 17, inches: 2.24, mm: 57.00 },
              { size: 18, inches: 2.30, mm: 58.30 },
              { size: 19, inches: 2.32, mm: 58.90 },
              { size: 20, inches: 2.37, mm: 60.20 },
              { size: 21, inches: 2.39, mm: 60.80 },
              { size: 22, inches: 2.44, mm: 62.10 },
              { size: 23, inches: 2.47, mm: 62.70 },
              { size: 24, inches: 2.52, mm: 64.00 },
              { size: 25, inches: 2.54, mm: 64.60 },
              { size: 26, inches: 2.59, mm: 65.90 },
              { size: 27, inches: 2.65, mm: 67.20 },
              { size: 28, inches: 2.67, mm: 67.80 },
              { size: 29, inches: 2.72, mm: 69.10 },
              { size: 30, inches: 2.80, mm: 71.00 },
            ].map((row) => (
              <tr key={row.size}>
                <td>{row.size}</td>
                <td>{row.inches}</td>
                <td>{row.mm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RingSize;
