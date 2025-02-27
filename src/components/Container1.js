import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ttfDashboard1 from '../images/Payroll.png';
import css from '../images/languages/css.png';
import firebase from '../images/languages/firebase.png';
import html from '../images/languages/html.png';
import js from '../images/languages/js.png';
import mysql from '../images/languages/mysql.png';
import node from '../images/languages/node.png';
import php from '../images/languages/php.png';
import python from '../images/languages/python.png';
import reactImg from '../images/languages/react.png';
import supabase from '../images/languages/supabase.png';
import swift from '../images/languages/swift.png';
import wordpress from '../images/languages/wordpress.png';
import ScrollAnimation from './ScrollAnimation';
import DotPatternDiv from './DotPattern';
import AnimatedTextSection from './StaggeredTextAnimation';


function Container1() {
  const images = [
    css, firebase, html, js, mysql, node, php, python, reactImg, supabase, swift, wordpress
  ];

  const sliderSettings = {
    dots: false,
    arrows:false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  

  return (
    <div
      style={{
        background: 'linear-gradient(0deg, rgb(0, 0, 0) 70%, rgba(44, 44, 44, 0.79) 100%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '20vh',
        paddingBottom: '20vh',
      }}
    >

    
    <DotPatternDiv>
      <div className='w-[80%] max-w-[1500px] mx-auto'>
        <AnimatedTextSection />
        <ScrollAnimation>
          <div className="relative bg-black flex justify-center items-center rounded-xl ">
            <img
              src={ttfDashboard1}
              className="w-full "
              style={{
                maskImage: 'linear-gradient(black 50%, transparent)',
                WebkitMaskImage: 'linear-gradient(black 10%, transparent)', // Safari support
              }}
            />
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
        <div className="mt-[100px]">
          <p className="text-gray-700 text-[20px]">Building with expertise in</p>
        </div>
        </ScrollAnimation>
        <ScrollAnimation>
        <div className="w-[70%] mt-10 mx-auto">
            <Slider {...sliderSettings}>
              {images.map((img, index) => {
                // Extract the technology name from the file path
                const techName = img.split('/').pop().split('.')[0].toUpperCase();

                return (
                  <div key={index} className="p-4 flex flex-col items-center">
                    <img
                      src={img}
                      alt={`Tech ${index}`}
                      className="h-[80px] mx-auto object-contain opacity-50"
                      style={{
                        maskImage: 'linear-gradient(black 50%, transparent)',
                      }}
                    />
                    <p className="text-gray-700 text-center mt-5 text-[16px] capitalize">
                      {techName}
                    </p>
                  </div>
                );
              })}
            </Slider>
        </div>
        
        </ScrollAnimation>
      </div>
    </DotPatternDiv>
    </div>
  );
}

export default Container1;
