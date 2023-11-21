import { createTheme, ThemeProvider } from '@mui/material/styles';
import{ useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const images = [
  '/public/images/carousal1.jpg',
  '/public/images/carousal1.jpg',

  '/public/images/carousal3.avif',


  
];



const CarousalBar = () => {
  return (
    <div className="banner">
      <div >

      </div>
  <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false}>
    {images.map((image, index) => (
      <div key={index}>
        <img
          src={image}
    
          className="carousel-image"
        />
      </div>
    ))}
  </Carousel>

</div>

  );
};

export default CarousalBar;