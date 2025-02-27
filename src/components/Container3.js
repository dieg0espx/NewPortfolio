import React from 'react';
import ScrollAnimation from './ScrollAnimation';
import FadeBox from './FadeBox';
import DotPatternDiv from './DotPattern';
import QuoteAi from '../components/QuoteAi'
import ScrollAnimationSideways from './ScrollAnimationSideways';

function Container3() {
  return (
    <DotPatternDiv>
        <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:gap-[100px] items-center justify-between  w-[90%] md:w-[70%] lg:w-[90%] max-w-[1500px] mx-auto pt-[100px]">
          <ScrollAnimation>
            <div className="flex flex-col space-y-6 sm:space-y-8 lg:space-y-10 text-left">
              <p className="text-primary text-lg sm:text-xl"> FROM LEARNING TO LEADING </p>
              <p className="text-white text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                Bridging Theory & Practice
              </p>
              <p className="text-gray-700 w-[100%] lg:w-[80%] text-lg sm:text-xl md:text-2xl">
                A foundation built on continuous learning, mastering technologies, and refining skills to turn knowledge into real-world impact.
              </p>
            </div>
          </ScrollAnimation>

          <div className="w-[100%] flex flex-col space-y-10">
            <ScrollAnimationSideways>
            <FadeBox>
                <div className='p-10'>
                    <p className='text-white text-right text-[20px] font-bold'> Web & Mobile App Development </p>
                    <p className='text-gray-700 text-right'> Cornerstone International Community College of Canada </p>
                    <p className='text-primary text-right'> Vancouver, Canada </p>
                    <p className='text-white text-right text-[15px]'> Graduated in 09/2021 </p>
                </div>
            </FadeBox>
            </ScrollAnimationSideways>
            <ScrollAnimationSideways>
            <FadeBox>
                <div className='p-10'>
                    <p className='text-white text-right text-[20px] font-bold'> Online Courses </p>
                    <p className='text-gray-700 text-right'> Udemy Online </p>
                    <p className='text-[15px] text-white text-right'> The Complete JavaScript Course 2025 </p>
                    <p className='text-[15px] text-primary text-right'> The Ultimate SEO Training 2025 + SEO For WordPress Websites </p>
                    <p className='text-[15px] text-white text-right'> React - The Complete Guide 2025 </p>
                </div>
            </FadeBox>
            </ScrollAnimationSideways>
          </div>
        </div>
        <ScrollAnimation>
          <QuoteAi />
        </ScrollAnimation>
    </DotPatternDiv>
  );
}

export default Container3;
