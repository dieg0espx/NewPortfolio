import React from "react";
import Slider from "react-slick";
import testimonials from "../testimonials.json";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FadeBox from "./FadeBox";

const Testimonials = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3, // Adjust based on screen size
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust speed
    pauseOnHover: false,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="w-full flex items-center justify-center ">
      <Slider {...settings} className="w-[100%]">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex-shrink-0 w-full md:w-auto px-2">
            <FadeBox>
              <div className="text-white rounded-lg p-8 h-[400px] flex flex-col justify-end text-right "> 
                <img 
                  src={require(`../${testimonial.image}`)} 
                  alt="Testimonial" 
                  className="rounded-full w-[40px] ml-auto mr-0 mb-5"
                />
                <h3 className="font-bold text-lg">{testimonial.full_name}</h3>
                <p className="text-md text-gray-600 italic h-[100px] flex items-center justify-center">"{testimonial.testimonial}"</p>
                <p className="text-xs mt-2 text-white">{testimonial.state}, {testimonial.country}</p>
                <p className="text-xs mt-2 text-primary">{testimonial.company_name}</p>
              </div>
            </FadeBox>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
