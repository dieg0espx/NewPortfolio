import React from 'react'
import insuranceProviders from '../../images/insurance_providers_cropped.png'
import a1 from '../../images/adviciPhones/a1.webp'
import a2 from '../../images/adviciPhones/a2.webp'
import a3 from '../../images/adviciPhones/a3.webp'
import ScrollAnimationSideways from '../ScrollAnimationSideways'
import ScrollAnimation from '../ScrollAnimation'
import DotPatternDiv from '../DotPattern'

function Project1() {
  return (
   <DotPatternDiv>
      <div className='grid grid-cols-[50%_50%] justify-between items-center space-x-[100px] mt-[150px]'>
            <ScrollAnimationSideways>
                <div className='flex justify-start transition-all duration-500 hover:-space-x-[50px]'>
                    <img src={a1} className="h-[550px] transition-all duration-500 z-0" />
                    <img src={a2} className="h-[550px] hover:h-[600px] hover:-mt-[50px] -ml-[120px] transition-all duration-500 z-0 hover:z-10" />
                    <img src={a3} className="h-[550px] -ml-[120px] transition-all duration-500 z-0 " />\
                </div>
            </ScrollAnimationSideways>
            <ScrollAnimationSideways>
                <div className='space-y-[10px]'>
                    <p className='text-[30px] font-bold text-left text-white'>  Insurance Support in Your Hands </p>
                    <p className='text-primary text-left text-[20px]'> React Native | Node Js | Supabase </p>
                    <p className='text-[25px] text-gray-700 text-left'> Advici simplifies insurance claims, offering seamless mobile access to tracking, updates, and expert assistance when you need it most. </p>
                </div>
            </ScrollAnimationSideways>
            
        </div>

        <div className='grid grid-cols-[40%_60%] justify-between items-center space-x-[100px] mt-[100px] '>
            <ScrollAnimationSideways>
                <div className='space-y-[10px]'>
                    <p className='text-[30px] font-bold text-left text-white'> Effortless Claim Handling </p>
                    <p className='text-primary text-left text-[20px]'> React JS | CSS | Node JS | Supabase  </p>
                    <p className='text-[25px] text-gray-700 text-left'> Stay in control of your insurance claims with Advici’s dashboard, offering real-time tracking and expert assistance at your fingertips. </p>
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
                  padding: '70px 0 0 120px',
                }}>
                    <img
                     src={insuranceProviders}
                     className="w-[1300px] rounded-xl transition-shadow transition-contrast duration-300 hover:shadow-[-20px_-25px_70px_5px_rgba(78,178,131,0.1)]"
                    />
                </div>
            </ScrollAnimation>
        </div>
   </DotPatternDiv>
  )
}

export default Project1