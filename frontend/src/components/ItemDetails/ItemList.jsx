import React from "react";
import { Link } from "react-router-dom";

const items = [
  { id: 1, name: "Ring1", price: 12000, weight: "22K, 20gms", image: "ring1.jpg", description: "Elegant gold ring with diamonds." },
  { id: 2, name: "Ring2", price: 35000, weight: "22K, 25gms", image: "ring2.jpg", description: "Stylish gold ring with a square design." },
  // Add other items here
];

const ItemList = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
      {items.map((item) => (
        <div key={item.id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
          <img src={item.image} alt={item.name} style={{ width: "150px" }} />
          <h3>{item.name}</h3>
          <p>{item.weight}</p>
          <p>Rs.{item.price}</p>
          <Link to={`/details/${item.id}`} style={{ textDecoration: "none", color: "blue" }}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
