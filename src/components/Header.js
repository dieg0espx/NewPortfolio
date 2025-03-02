import React, { useState, useEffect } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        !(event.target instanceof Element && event.target.closest("#mobile-menu"))
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // Close menu after clicking
    }
  }

  return (
    <div className="fixed top-5 w-full z-50">
      <div className="flex justify-between items-center w-[90%] max-w-[1400px] mx-auto border border-gray-700 px-[20px] lg:py-[10px] rounded-3xl text-white bg-black/20 backdrop-blur-lg">

        {/* Logo */}
        <div>
          <h1 className="text-[20px] lg:text-[30px] flex items-center">
            <i className="bi bi-code-slash mr-3"></i> Diego Espinosa
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-10">
          <p className="text-[18px] text-white hover:text-primary font-light cursor-pointer" onClick={() => scrollToSection('container1')}>Home</p>
          <p className="text-[18px] text-white hover:text-primary font-light cursor-pointer" onClick={() => scrollToSection('container3')}>Education</p>
          <p className="text-[18px] text-white hover:text-primary font-light cursor-pointer" onClick={() => scrollToSection('container2')}>Experience</p>
          <p className="text-[18px] text-white hover:text-primary font-light cursor-pointer" onClick={() => scrollToSection('container4')}>Contact</p>
        </div>

        {/* Contact Buttons - Desktop */}
        <div className="hidden lg:flex">
          <div className="grid grid-cols-3 gap-5">
            <a className="text-[20px] text-gray-500 hover:text-white flex flex-col" href="https://github.com/dieg0espx" target="_blank" rel="noopener noreferrer"> 
              <i className="bi bi-github"></i> 
            </a>
            <a className="text-[20px] text-gray-500 hover:text-white flex flex-col" href="https://www.linkedin.com/in/devDiegoE/" target="_blank" rel="noopener noreferrer"> 
              <i className="bi bi-linkedin"></i>
            </a>
            <a className="text-[20px] text-gray-500 hover:text-white flex flex-col" href="mailto:espinosa9mx@gmail.com"> 
              <i className="bi bi-envelope"></i> 
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(true)} className="text-white text-[28px]">
            <i className="bi bi-list"></i>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div className={`fixed top-0 left-0 h-full w-[250px] bg-black/85 backdrop-blur-lg shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`} id="mobile-menu">
        {/* Close Button */}
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-5 right-5 text-white text-[24px]">
          <i className="bi bi-x-lg"></i>
        </button>

        {/* Menu Items - Mobile */}
        <div className="flex flex-col items-start space-y-6 p-10 pt-16 text-white text-[18px]">
          <p className="hover:text-primary cursor-pointer" onClick={() => scrollToSection('container1')}>Home</p>
          <p className="hover:text-primary cursor-pointer" onClick={() => scrollToSection('container3')}>Education</p>
          <p className="hover:text-primary cursor-pointer" onClick={() => scrollToSection('container2')}>Experience</p>
          <p className="hover:text-primary cursor-pointer" onClick={() => scrollToSection('container4')}>Contact</p>

          {/* Social Links */}
          <div className="grid grid-cols-3 gap-5">
            <a className="text-[20px] text-gray-500 hover:text-white flex flex-col" href="https://github.com/dieg0espx" target="_blank" rel="noopener noreferrer"> 
              <i className="bi bi-github"></i> 
            </a>
            <a className="text-[20px] text-gray-500 hover:text-white flex flex-col" href="https://www.linkedin.com/in/devDiegoE/" target="_blank" rel="noopener noreferrer"> 
              <i className="bi bi-linkedin"></i>
            </a>
            <a className="text-[20px] text-gray-500 hover:text-white flex flex-col" href="mailto:espinosa9mx@gmail.com"> 
              <i className="bi bi-envelope"></i> 
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
