import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext'
import './ProductDisplay.css';
import Jewelitem from '../Jewelitem/Jewelitem';
import { useNavigate } from "react-router-dom";

export const ProductDisplay = ({ product }) => {
  const { product_list } = useContext(StoreContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Product changed:", product);
    
    if (product === "All") {
      setFilteredProducts(product_list);
    } else {
      setFilteredProducts(product_list.filter((item) => item.category === product));
    }
  }, [product, product_list]);

  const handleProductClick = (id) => {
    navigate(`/item-details/${id}`);
  };

  return (
    <div className='product-display' id='product-display'>
      <h2>Explore our curated collection of jewellery across a range of categories</h2>
      <div className="product-display-list">
        {filteredProducts.map((item, index) => (
          <div key={index} onClick={() => handleProductClick(item._id)}>
            <Jewelitem
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;
