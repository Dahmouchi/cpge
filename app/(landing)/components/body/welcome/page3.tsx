"use client";

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const PercentageCounter = ({ targetValue, label }:any) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          startCounting();
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [hasAnimated]);

  const startCounting = () => {
    const duration = 3; // duration in seconds
    const increment = targetValue / (duration * 60); // target divided by number of frames (60fps)

    let currentCount = 0;
    const intervalId = setInterval(() => {
      currentCount += increment;
      if (currentCount >= targetValue) {
        clearInterval(intervalId);
        setCount(targetValue);
      } else {
        setCount(Math.floor(currentCount));
      }
    }, 1000 / 60); // update every 16.67ms (~60fps)
  };

  return (
    <div ref={counterRef} className="flex flex-col items-center">
      <motion.div
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-800 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span>{count}</span>%
        <motion.span
          className="absolute top-0 left-0 text-emerald-500 text-shadow-sm text-shadow-blur-2 text-shadow-red"
          initial={{ x: -2, y: 2, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {count}%
        </motion.span>
      </motion.div>
      <p className=" md:text-base text-center text-gray-700 font-bold text-xl mt-2">
        {label}
      </p>
    </div>
  );
};

export default PercentageCounter;
