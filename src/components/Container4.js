import React, { useState } from "react";
import ScrollAnimation from "./ScrollAnimation";
import ScrollAnimationSideways from "./ScrollAnimationSideways";
import DotPatternDiv from "./DotPattern";
import Testimonials from "./Testimonials";

function Container4({id}) {
  const [status, setStatus] = useState()
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    jobTitle: "",
    location: "Remote",
    message: "",
  });

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on input change
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.company.trim()) newErrors.company = "Company is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop submission if form is invalid

    console.log("Form Submitted:", formData);
    await sendMessage();
    setFormData({
      name: "",
      company: "",
      email: "",
      jobTitle: "",
      location: "Remote",
      message: "",
    });
  };

  const sendMessage = async () => {
    setStatus('Sending...')
    const fields = [
      { label: "Name", value: formData.name },
      { label: "Company", value: formData.company },
      { label: "Email", value: formData.email },
      { label: "Job Title", value: formData.jobTitle },
      { label: "Location", value: formData.location },
      { label: "Message", value: formData.message },
    ];

    for (const field of fields) {
      if (field.value) {
        const message = `${field.label}: ${field.value}`;
        const encodedMessage = encodeURIComponent(message);
        const apiUrl = `https://api.callmebot.com/whatsapp.php?phone=5219999088639&text=${encodedMessage}&apikey=9854646`;

        try {
          const response = await fetch(apiUrl);
          if (response.ok) {
            console.log(`Sent: ${message}`);
          } else {
            console.error(`Failed to send: ${message}`);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }

        // Small delay to avoid spam protection
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    setStatus('Sent Successfully.')
  };

  return (
    <DotPatternDiv>
      <div id={id} className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:gap-[100px] items-center justify-between w-[90%] md:w-[70%] lg:w-[90%] max-w-[1500px] mx-auto pt-[100px] mb-[50px]">
        <ScrollAnimation>
          <div className="flex flex-col space-y-6 sm:space-y-8 lg:space-y-10 text-left">
            <p className="text-primary text-lg sm:text-xl"> NEED A PROBLEM SOLVER? </p>
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
              <div className="block md:flex flex-row justify-between items-center border-b border-[rgba(76,76,76,0.5)] py-3 px-10">
                <p className="text-white  text-left text-[30px] font-bold"> Send Message</p>
                {status && (
                  <p className="text-gray-600 flex items-center gap-3">
                    <i className={`bi bi-circle-fill text-[10px] 
                      ${status === 'Sending...' ? 'text-yellow-500 animate-[blink_1s_infinite]' : 'text-green-500'}`}
                    ></i> 
                    {status}
                  </p>                
                )}
              </div>
              <div className="block md:grid grid-cols-2 w-[90%] mx-auto gap-5 space-y-[12px] md:space-y-0">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-[100%] px-5 py-3 rounded-lg bg-transparent border border-gray-700 text-white outline-none"
                    placeholder="Full Name"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-[100%] px-5 py-3 rounded-lg bg-transparent border border-gray-700 text-white outline-none"
                    placeholder="Company Name"
                  />
                  {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
                </div>
              </div>
              <div className="block md:grid grid-cols-2 w-[90%] mx-auto gap-5 space-y-[12px] md:space-y-0">
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-[100%] px-5 py-3 rounded-lg bg-transparent border border-gray-700 text-white outline-none"
                    placeholder="Email Address"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                    className="w-[100%] px-5 py-3 rounded-lg bg-transparent border border-gray-700 text-white outline-none"
                    placeholder="Job Position"
                  />
                  {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle}</p>}
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
                  className="w-[90%] px-5 py-3 rounded bg-transparent border border-gray-700 text-white outline-none"
                  placeholder="Anything else you'd like to add..."
                />
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              </div>
              <button type="submit" className="w-[90%] p-3 bg-primary text-white font-bold rounded-md hover:bg-red-600">
                Send Message
              </button>
            </form>
          </div>
        </ScrollAnimationSideways>
      </div>
      <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:gap-[100px] items-center justify-between w-[90%] md:w-[70%] lg:w-[90%] max-w-[1500px] mx-auto">
        <ScrollAnimationSideways w='full'>
          <ScrollAnimation>
            <Testimonials />
          </ScrollAnimation>
        </ScrollAnimationSideways>
      </div>


      
    </DotPatternDiv>
  );
}

export default Container4;
