// src/components/keyboard/KeyboardCarousel.jsx

import React from 'react';
import Slider from 'react-slick';
import { useRouter } from 'next/router';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const KeyboardCarousel = ({ designs, onSelect }) => {
    
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    return (
        <div className='slider-container mx-8 mt-4'>
            <Slider {...settings}>
                {designs.map(design => (
                    <div key={design.design_id} className="p-4 border border-gray-300 rounded-lg bg-gray-100" onClick={() => onSelect(design)}>
                        <h3>Name: {design.design_name}</h3>
                        <p>Alphas: {design.alphas_color}</p>
                        <p>Modifiers: {design.modifiers_color}</p>
                        <p>Accents: {design.accents_color}</p>
                        <p>Legends: {design.legends_color}</p>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default KeyboardCarousel;