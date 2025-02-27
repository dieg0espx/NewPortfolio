import { useEffect, useRef, useState } from "react";
import t1 from '../../images/ttfPhones/t1.webp'
import t2 from '../../images/ttfPhones/t2.webp'
import t3 from '../../images/ttfPhones/t3.webp'
import takeOff from '../../images/ttfTakeoff.png'
import ScrollAnimationSideways from '../ScrollAnimationSideways'
import ScrollAnimation from '../ScrollAnimation'
import DotPatternDiv from '../DotPattern'
import overlap from '../../images/overlap2.png'

function Project3() {

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
          { threshold: 0.2 } // Adjust threshold for triggering effect
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
        <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:gap-[100px] items-center justify-between mt-[100px] w-[100%]">
            <ScrollAnimationSideways>
              <div className="flex justify-start transition-all duration-500">
                  <img src={t1} className="h-[300px] md:h-[550px] transition-all duration-500 z-0" />
                  <img ref={imageRef} src={t2} 
                      className={`transition-all duration-500 z-0 ${
                          isInView ? "h-[350px] md:h-[600px] -ml-[80px] sm:-ml-[120px] -mt-[50px] z-10" 
                                   : "h-[300px] md:h-[550px] -ml-[80px] sm:-ml-[120px]"
                      }`} 
                  />
                  <img src={t3} className="h-[300px] md:h-[500px] md:h-[550px] -ml-[80px] sm:-ml-[120px] transition-all duration-500 z-0" />
              </div>
            </ScrollAnimationSideways>
            <ScrollAnimationSideways>
                <div className="space-y-5 sm:space-y-6">
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-left text-white"> Seamless Operations Management </p>
                  <p className="text-primary text-left text-lg sm:text-xl md:text-2xl"> React Js | CSS | PHP | MySQL </p>
                  <p className="text-gray-700 text-left text-lg sm:text-xl"> Simplifies complex logistics. From real-time order tracking to seamless truck dispatching, this powerful tool keeps teams connected, organized, and in control. </p>
                </div>
            </ScrollAnimationSideways>
            
        </div>

        <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:gap-[100px] items-center justify-between mt-[100px] w-[100%]">
            <ScrollAnimationSideways>
                <div className="space-y-5 sm:space-y-6">
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-left text-white"> From Plans to Reality </p>
                  <p className="text-primary text-left text-lg sm:text-xl md:text-2xl"> React JS | Python | Tailwind | PHP | MYSQL  </p>
                  <p className="text-gray-700 text-left text-lg sm:text-xl"> Upgrade your workflow with automated material calculations. The system intelligently processes blueprints, identifies requirements, and provides actionable insights. </p>
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
                    padding: '15% 30px 0 30px',
                  }}
                >
                    <img
                     ref={t2Ref}
                     src={takeOff}
                     className={`w-[1300px] mx-auto rounded-t-sm lg:rounded-t-xl transition-shadow duration-300 ${
                        isT2InView ? "shadow-[0px_-25px_70px_5px_rgba(255,255,255,0.13)]" : "shadow-none"
                     }`}
                    />
                </div>
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
                        borderRadius: '10px',
                        padding:'15px 20px',
                        marginTop: '-20%',
                        marginLeft : '-5%',
                        position: 'relative',
                      }}
                  >
                    <img 
                        src={overlap}
                        alt="Description"
                        className="w-[100px] md:w-[250px]"
                    />
                  </div>
              </ScrollAnimation>
            </ScrollAnimation>
        </div>
   </DotPatternDiv>
  )
}

export default Project3