import React from 'react';
import ScrollAnimation from './ScrollAnimation';
import Project1 from './Projects/Project1';
import Project2 from './Projects/Project2';
import Project3 from './Projects/Project3';

function Container2({ id }){
  return (
    <div id={id} className="bg-black w-[90%] md:w-[70%] lg:w-[90%] max-w-[1500px] mx-auto">
      <ScrollAnimation>
        <div className="flex flex-col space-y-6 sm:space-y-8 lg:space-y-10 text-center">
          <p className="text-primary text-lg sm:text-xl">CODE IN MOTION</p>
          <p className="text-white text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            Turning Visions Into Reality
          </p>
          <p className="text-gray-700 w-[100%] lg:w-[60%] mx-auto text-lg sm:text-xl md:text-2xl">
            A journey through projects where ideas became interactive, meaningful solutions—built to inspire, innovate, and drive change.
          </p>
        </div>
      </ScrollAnimation>

      {/* Projects Section */}
      <div className="flex flex-col gap-16 sm:gap-20 mt-10">
        <Project3 />
        <Project1 />
        <Project2 />
      </div>
    </div>
  );
}

export default Container2;
