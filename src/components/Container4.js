import React from 'react';
import { useState } from "react";
import ScrollAnimation from './ScrollAnimation';
import ScrollAnimationSideways from './ScrollAnimationSideways'
import DotPatternDiv from './DotPattern';


function Container4() {
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        jobTitle: "",
        jobDescription: "",
        location: "Remote",
        message: "",
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        alert("Your message has been sent!");
      };
  return (
    <DotPatternDiv>
        <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:gap-[100px] items-center justify-between  w-[90%] md:w-[70%] lg:w-[90%] max-w-[1500px] mx-auto pt-[100px]">
          <ScrollAnimation>
            <div className="flex flex-col space-y-6 sm:space-y-8 lg:space-y-10 text-left">
              <p className="text-primary text-lg sm:text-xl"> NEED A PROBLEM SOLVER ? </p>
              <p className="text-white text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                Your Next Developer Is One Message Away
              </p>
              <p className="text-gray-700 w-[100%] lg:w-[80%] text-lg sm:text-xl md:text-2xl">
               I specialize in turning concepts into fully functional web solutions. Let’s connect and discuss how I can help—send me a message today!
              </p>
            </div>
          </ScrollAnimation>
          <ScrollAnimationSideways>
            <div className="w-[100%] flex flex-col">
              <form onSubmit={handleSubmit} className="space-y-3 pb-[20px] border border-[rgba(76,76,76,0.5)] rounded-lg bg-black">
                  <p className='text-white border-b border-[rgba(76,76,76,0.5)] py-3 px-10 text-left text-[30px] font-bold'> Send Message </p>
                <div className='grid grid-cols-2 w-[90%] mx-auto gap-5'>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-[100%] px-5 py-3 rounded-lg bg-transparent border border-gray-700 text-white"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-[100%] px-5 py-3 rounded-lg bg-transparent border border-gray-700 text-white"
                      placeholder="Company Name"
                    />
                  </div>
                </div>
                <div className='grid grid-cols-2 w-[90%] mx-auto gap-5'>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-[100%] px-5 py-3 rounded-lg bg-transparent border border-gray-700 text-white"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      required
                      className="w-[100%] px-5 py-3 rounded-lg bg-transparent border border-gray-700 text-white"
                      placeholder="Frontend Developer"
                    />
                  </div>
                </div>
                <div>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-[90%] px-5 py-3 rounded-lg bg-transparent border border-gray-700 text-white"
                  >
                    <option value="Remote">Remote</option>
                    <option value="On-Site">On-Site</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>               
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-[90%] px-5 py-3 rounded bg-transparent border border-gray-700 text-white "
                    placeholder="Anything else you'd like to add..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-[90%] p-3 bg-primary text-white font-bold rounded-md hover:bg-red-600 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </ScrollAnimationSideways>
        </div>
    </DotPatternDiv>
  );
}

export default Container4;
