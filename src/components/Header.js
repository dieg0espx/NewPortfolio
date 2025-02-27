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
          <p className="text-[18px] text-white hover:text-primary font-light cursor-pointer">Home</p>
          <p className="text-[18px] text-white hover:text-primary font-light cursor-pointer">Education</p>
          <p className="text-[18px] text-white hover:text-primary font-light cursor-pointer">Experience</p>
          <p className="text-[18px] text-white hover:text-primary font-light cursor-pointer">Contact</p>
        </div>

        {/* Contact Button - Desktop */}
        <div className="hidden lg:flex">
          <button className="bg-primary px-5 py-1 rounded-lg font-semibold text-[15px]">Contact Me</button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(true)} className="text-white text-[28px]">
            <i className="bi bi-list"></i>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div className={`fixed top-0 left-0 h-full w-[250px] bg-black/90 backdrop-blur-lg shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`} id="mobile-menu">
        {/* Close Button */}
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-5 right-5 text-white text-[24px]">
          <i className="bi bi-x-lg"></i>
        </button>

        {/* Menu Items */}
        <div className="flex flex-col items-start space-y-6 p-10 pt-16 text-white text-[18px]">
          <p className="hover:text-primary cursor-pointer" onClick={() => setIsMenuOpen(false)}>Home</p>
          <p className="hover:text-primary cursor-pointer" onClick={() => setIsMenuOpen(false)}>Education</p>
          <p className="hover:text-primary cursor-pointer" onClick={() => setIsMenuOpen(false)}>Experience</p>
          <p className="hover:text-primary cursor-pointer" onClick={() => setIsMenuOpen(false)}>Contact</p>
          <button className="bg-primary px-5 py-2 rounded-lg font-semibold text-[18px] mt-4 w-full" onClick={() => setIsMenuOpen(false)}>Contact Me</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
