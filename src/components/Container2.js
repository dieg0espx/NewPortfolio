import React from 'react'
import ScrollAnimation from './ScrollAnimation'
import Project1 from './Projects/Project1'
import Project2 from './Projects/Project2'

import ScrollAnimationSideways from './ScrollAnimationSideways'
import DotPatternDiv from './DotPattern'

function Container2() {
  return (
    <div className='bg-black w-[80%] max-w-[1500px] mx-auto'>
        <ScrollAnimation >
            <div className="flex flex-col space-y-8">
                <p className="text-primary">CODE IN MOTION</p>
                <p className="text-white text-[67px] font-semibold">
                    Turning Visions Into Reality
                </p>
                <p className="text-gray-700 w-[60%] mx-auto text-[25px]">
                    A journey through the projects where ideas became interactive, meaningful solutions—built to inspire, innovate, and drive change.
                </p>
            </div>
        </ScrollAnimation>
        <Project1 />
        <Project2 />
    </div>

)}

export default Container2