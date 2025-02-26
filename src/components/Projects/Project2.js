import React from 'react'
import ScrollAnimationSideways from '../ScrollAnimationSideways'
import ScrollAnimation from '../ScrollAnimation'
import DotPatternDiv from '../DotPattern'
import badass from '../../images/laptopBadass.png'
import b1 from '../../images/badassPhones/b1.webp'
import b2 from '../../images/badassPhones/b2.webp'
import b3 from '../../images/badassPhones/b3.webp'


function Project2() {
  return (
    <DotPatternDiv>
        <div className='grid grid-cols-[50%_50%] justify-between items-center space-x-[100px] mt-[150px]'>
            <ScrollAnimationSideways>
                <div className='flex justify-start transition-all duration-500 hover:-space-x-[50px]'>
                    <img src={b3} className="h-[550px] transition-all duration-500 z-0" />
                    <img src={b2} className="h-[550px] hover:h-[600px] hover:-mt-[50px] -ml-[120px] transition-all duration-500 z-0 hover:z-10" />
                    <img src={b1} className="h-[550px] -ml-[120px] transition-all duration-500 z-0 " />\
                </div>
            </ScrollAnimationSideways>
            <ScrollAnimationSideways>
                <div className='space-y-[10px]'>
                    <p className='text-[30px] font-bold text-left text-white'> Where Fire Meets Flavor </p>
                    <p className='text-primary text-left text-[20px]'> React JS | Node JS | Supabase | Tailwind | OpenAI </p>
                    <p className='text-[25px] text-gray-700 text-left'> Precision-engineered grills designed to take your BBQ experience to the next level – because great food deserves great tools. </p>
                </div>
            </ScrollAnimationSideways>
        </div>

        <div className='grid grid-cols-[40%_60%] justify-between items-center space-x-[100px] mt-[100px] '>
            <ScrollAnimationSideways>
                <div className='space-y-[10px]'>
                    <p className='text-[30px] font-bold text-left text-white'> BBQ Shopping, Reinvented </p>
                    <p className='text-primary text-left text-[20px]'> React JS | Node JS | Supabase | Tailwind | OpenAI   </p>
                    <p className='text-[25px] text-gray-700 text-left'> A seamless online shopping experience with AI-powered product recommendations, real-time inventory tracking, and secure transactions—built for grill masters. </p>
                </div>
            </ScrollAnimationSideways>
            <ScrollAnimation>
                <div >
                    <img
                     src={badass}
                     className="w-[1300px] rounded-xl transition-shadow transition-contrast duration-300 hover:shadow-[-20px_-25px_70px_5px_rgba(78,178,131,0.1)]"
                    />
                </div>
            </ScrollAnimation>
        </div>
    </DotPatternDiv>
  )
}

export default Project2