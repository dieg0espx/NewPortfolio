import { useEffect, useRef, useState } from "react";
import ScrollAnimationSideways from '../ScrollAnimationSideways'
import ScrollAnimation from '../ScrollAnimation'
import DotPatternDiv from '../DotPattern'
import badass from '../../images/badass.png'
import b1 from '../../images/badassPhones/b1.webp'
import b2 from '../../images/badassPhones/b2.webp'
import b3 from '../../images/badassPhones/b3.webp'


function Project2() {

  const [isInView, setIsInView] = useState(false);
  const [isT2InView, setIsT2InView] = useState(false);
  const imageRef = useRef(null);
  const t2Ref = useRef(null);

  useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        { threshold: 0.8 } // Adjust threshold for triggering effect
      );
  
      if (imageRef.current) {
        observer.observe(imageRef.current);
      }
  
      return () => {
        if (imageRef.current) {
          observer.unobserve(imageRef.current);
        }
      };
  }, []);

  useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsT2InView(entry.isIntersecting);
        },
        { threshold: 0.6 } // Adjust threshold for triggering effect
      );
  
      if (t2Ref.current) {
        observer.observe(t2Ref.current);
      }
  
      return () => {
        if (t2Ref.current) {
          observer.unobserve(t2Ref.current);
        }
      };
  }, []);

  return (
    <DotPatternDiv>
        <div className='grid grid-cols-[50%_50%] justify-between items-center space-x-[100px] mt-[150px]'>
            <ScrollAnimationSideways>
                <div className='flex justify-start transition-all duration-500 hover:-space-x-[50px]'>
                    <img src={b2} className="h-[550px] transition-all duration-500 z-0" />
                    <img ref={imageRef} src={b1} className={`transition-all duration-500 z-0 ${
                        isInView ? "h-[600px] -ml-[120px] -mt-[50px] z-10" : "h-[550px] -ml-[120px]"
                      }`} />
                    <img src={b3} className="h-[550px] -ml-[120px] transition-all duration-500 z-0 " />\
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
                <div 
                  style={{
                    background: 'linear-gradient(0deg, rgb(0, 0, 0) 50%, rgb(21, 21, 21) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 'fit-content', 
                    border: '1px solid rgba(76, 76, 76, 0.5)',
                    borderRadius: '20px', 
                    padding: '70px 30px 0 30px',
                  }}
                >
                    <img
                     ref={t2Ref}
                     src={badass}
                     className={`w-[1300px] mx-auto rounded-t-xl transition-shadow duration-300 ${
                        isT2InView ? "shadow-[0px_-25px_70px_5px_rgba(170,13,34,0.8)]" : "shadow-none"
                     }`}
                    />
                </div>
            </ScrollAnimation>
        </div>
    </DotPatternDiv>
  )
}

export default Project2