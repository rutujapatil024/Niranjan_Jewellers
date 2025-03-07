import React from "react";
import Slider from "react-slick"; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Bridal.css'

const images = [
    { id: 1, src: "bridal1b.jpg", category: "Category1" },
    { id: 2, src: "bridal1a.jpg", category: "Category1" },
    { id: 3, src: "bridal1c.jpg", category: "Category1" },
    { id: 4, src: "bridal2b.jpg", category: "Category2" },
    { id: 5, src: "bridal2a.jpg", category: "Category2" },
    { id: 6, src: "bridal2c.jpg", category: "Category2" },
    { id: 7, src: "bridal3b.jpg", category: "Category3" },
    { id: 8, src: "bridal3a.jpg", category: "Category3" },
    { id: 9, src: "bridal3c.jpg", category: "Category3" },
    { id: 10, src: "bridal4b.jpg", category: "Category4" },
    { id: 11, src: "bridal4a.jpg", category: "Category4" },
    { id: 12, src: "bridal4c.jpg", category: "Category4" },
    { id: 13, src: "bridal5b.jpg", category: "Category5" },
    { id: 14, src: "bridal5a.jpg", category: "Category5" },
    { id: 15, src: "bridal5c.jpg", category: "Category5" }
];

const HomePage = () => {
    const settings = {
        dots: true, // Show navigation dots
        infinite: true, // Infinite loop
        speed: 500, // Transition speed
        slidesToShow: 3, // Show 3 images at a time
        slidesToScroll: 3, // Scroll one image at a time
        autoplay: true, // Enable auto-sliding
        autoplaySpeed: 3000, // Slide every 3 seconds
    };

    return (
        <div className="img-container" style={{ marginTop:"50px", marginBottom:"10px", marginLeft:"140px", marginRight:"140px"}}>
            <h2 className="bridal-title">Bridal tales of India </h2>
            <Slider {...settings}>
                {images.map((image) => (
                    <div key={image.id}>
                        <img
                            src={image.src}
                            alt={image.category}
                            style={{
                                width: "100%",
                                height: "auto", // Let the height adjust according to the aspect ratio
                                maxHeight: "500px", // Ensure it doesn't exceed the container's height
                                objectFit: "cover",
                                borderRadius: "8px",
                            }}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HomePage;
