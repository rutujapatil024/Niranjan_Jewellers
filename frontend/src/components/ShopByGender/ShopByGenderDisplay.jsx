import React, { useContext } from 'react';
import './ShopByGenderDisplay.css';
import { StoreContext } from '../../Context/StoreContext';
import Jewelitem from '../Jewelitem/Jewelitem';
import { useNavigate } from "react-router-dom";

export const ShopByGenderDisplay = () => {
  const { product_list, activeGender } = useContext(StoreContext);
  const navigate = useNavigate();

  const filteredProducts = product_list.filter((item) => item.gender === activeGender);

  return (
    <div className='shop-by-gender-display' id='shop-by-gender-display'>
      <h2 className='title'>{activeGender}'s Jewellery Collection</h2>
      <div className="shop-by-gender-display-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item, index) => (
            <div key={index} className='product-card' onClick={() => navigate(`/item/${item._id}`)}>
              <div className='product-image-container'>
                <img src={item.image} alt={item.name} className='product-image'/>
              </div>
              <div className='product-info'>
                <p className='product-name'>{item.name}</p>
                <p className='product-price'>₹{item.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className='no-products'>No products available for {activeGender}</p>
        )}
      </div>
    </div>
  );
};

export default ShopByGenderDisplay;
