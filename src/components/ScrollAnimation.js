import React, { useEffect, useState, useRef } from 'react';

function ScrollAnimation({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  const handleScroll = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const isElementVisible = rect.top < window.innerHeight - 50 && rect.bottom > 0;

      setIsVisible(isElementVisible); // Update visibility dynamically
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on mount to check initial visibility

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={elementRef}
      className={`w-full relative transition-all duration-1000 ease-in-out transform ${
        isVisible
          ? 'translate-y-0 blur-0 opacity-100'
          : 'translate-y-40 blur-md opacity-0' // More noticeable movement
      }`}
    >
      {children}
    </div>
  );
}

export default ScrollAnimation;
