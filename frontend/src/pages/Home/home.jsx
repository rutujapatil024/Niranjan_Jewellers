import React, { useState, useEffect } from 'react';
import './home.css';
import Header from '../../components/Header/Header';
import Categories from '../../components/Categories/Categories';
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay';
import Bridal from '../../components/Bridal/Bridal';
import ShopByGender from '../../components/ShopByGender/ShopByGender';
import VideoGallery from '../../components/VideoGallery/VideoGallery';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [product, setProduct] = useState("All");
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#categories") {
      document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  return (
    <div>
      <Header />
      <div id="categories">
        <Categories product={product} setProduct={setProduct} />
      </div>
      <ProductDisplay product={product} />
      <VideoGallery />
      <Bridal />
      <ShopByGender />
    </div>
  );
};

export default Home;