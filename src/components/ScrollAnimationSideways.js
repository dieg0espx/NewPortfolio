import React, { useEffect, useState, useRef } from 'react';

function ScrollAnimationSideways({ children, direction = 'left' }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  const handleScroll = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const isElementVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0;

      setIsVisible(isElementVisible); // Update visibility every time
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once in case the element is already in view

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={elementRef}
      className={`w-full relative flex justify-center items-center transition-all duration-700 ease-in-out transform ${
        isVisible
          ? 'translate-x-0 blur-0 opacity-100'
          : direction === 'left'
          ? '-translate-x-[100px] blur-sm opacity-0'
          : 'translate-x-[100px] blur-sm opacity-0'
      }`}
    >
      {children}
    </div>
  );
}

export default ScrollAnimationSideways;
