import React, { useState,useContext } from "react";
import { womensJewelry, mensJewelry, kidsJewelry } from "../../assets/assets"; // Ensure correct import
import "./ShopByGender.css";
import { Link } from "react-router-dom";
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from "react-router-dom";


const ShopByGender = () => {
  const [activeTab, setActiveTab] = useState("Women");
   const { activeGender,setActiveGender, activecategory,setActiveCategory } = useContext(StoreContext);
   const navigate = useNavigate();
  // Ensure categories are correctly mapped to imported data
  const categories = {
    Women: womensJewelry,
    Men: mensJewelry,
    Kids: kidsJewelry,
  };

  return (
    <div className="shop-by-gender">
      <h1 className="title">Shop By Gender</h1>

      <div className="tabs">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            className={activeTab === category ? "active" : ""}
           onClick={()=>{
            setActiveGender(category)
             setActiveTab(category)
           }}
          >
            {category}'s Jewellery
          </button>
        ))}
      </div>

      <div className="products">
        {categories[activeTab]?.map((item, index) => (
          <div onClick={()=>{
            console.log(activeTab,item)
            setActiveCategory(item.name)
            setActiveGender(activeTab)
            navigate('/shop-by-gender')
          }} className="product-card" key={index}>
            <img src={item.image} alt={item.name} className="product-image" />
            <p className="product-name">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByGender;
