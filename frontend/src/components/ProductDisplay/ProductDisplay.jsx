import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductDisplay.css';
import Jewelitem from '../Jewelitem/Jewelitem';
import { useNavigate } from "react-router-dom";
//import { toast } from 'react-toastify';

export const ProductDisplay = ({ product }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  // Fetch product list from backend
  const fetchList = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/auth/jewellery");
      console.log("Response Status:", response.status);
      if (response.status === 200) {
        console.log("Product List Data:", response.data);
        setList(response.data);
      } else {
       // toast.error("Failed to fetch product data");
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
     // toast.error("Error fetching product list");
    }
  };

  // Fetch list on component mount
  useEffect(() => {
    fetchList();
  }, []);

  // Navigate to item details page
  const handleProductClick = (id) => {
    navigate(`/item-details/${id}`);
  };

  return (
    <div className='product-display' id='product-display'>
      <h2>Explore our curated collection of jewellery across a range of categories</h2>
      <div className="product-display-list">
        {list.map((item, index) => {
          // Filter based on category or show all
          if (product === "All" || product === item.category_name) {
            return (
              <div key={index} onClick={() => handleProductClick(item._id)}>
                <Jewelitem
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ProductDisplay;
