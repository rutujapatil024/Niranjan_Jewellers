import React, { useState, useEffect } from 'react';
import './Header.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Header = () => {
  const [images, setImages] = useState([
    'image1.jpg', 
    'image2.jpg', 
    'image3.jpg', 
    'image4.jpg' 
  ]); 

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000, 
  };

  return (
    <div className="header">
      <div className="header-contents">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Banner ${index + 1}`} /> 
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Header;