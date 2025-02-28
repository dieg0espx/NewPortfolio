"use client";

import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3, // Stagger effect
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function AnimatedTextSection() {
  const lines = [
    { text: "MORE THAN A PROGRAMMER", style: "text-primary text-lg sm:text-xl md:text-2xl text-center" },
    { text: "Your vision, my code, our success", style: "text-white text-5xl sm:text-5xl md:text-6xl font-semibold text-center max-w-[95%] mx-auto" },
    { text: "I specialize in creating innovative applications designed to solve real-world problems. My focus is on delivering efficient, future-proof solutions for modern businesses.", style: "text-gray-700 w-[90%] sm:w-[90%] md:w-[95%] mx-auto text-lg sm:text-lg md:text-2xl text-center" },
  ];

  return (
    <div className="flex flex-col space-y-10 mb-[50px] sm:mb-[80px] md:mb-[100px] px-0">
      {lines.map((line, i) => (
        <motion.p
          key={i}
          className={line.style}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={i} // Pass index for staggered effect
        >
          {line.text}
        </motion.p>
      ))}

      {/* Buttons with Animation */}
      <motion.div
        className="flex flex-row justify-center items-center mx-auto space-x-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
      >
        <button className="bg-primary text-white rounded-2xl w-[140px] sm:w-[200px] h-[40px] sm:h-[50px] text-sm sm:text-lg hover:shadow-[0px_0px_70px_5px_rgba(121,79,255,0.7)]">
          Contact Me
        </button>
        {/* <button className="bg-gray-800 text-white rounded-2xl w-[140px] sm:w-[200px] h-[40px] sm:h-[50px] text-sm sm:text-lg border border-gray-700 hover:shadow-[0px_0px_70px_5px_rgba(255,255,255,0.2)]">
          Ask Me
        </button> */}
      </motion.div>

    </div>
  );
}
