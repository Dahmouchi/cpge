"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ImageSection() {
  const variants = {
    hidden: { opacity: 0, y: -20 }, // Start hidden with a slight upward offset
    visible: (i:any) => ({
      opacity: 1,
      y: 0, // Animate to the original position
      transition: {
        delay: i * 0.8, // Stagger the animation for each card
        duration: 0.6,
      },
    }),
    hover: {
      y: -10, // Move the card up on hover
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)", // Add shadow on hover
      transition: {
        duration: 0.3, // Duration of the hover effect
        ease: "easeInOut", // Smooth easing
      },
    },
  };

  return (
    <section className="flex flex-col lg:flex-row justify-between items-center p-8 bg-white">
      <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={variants}
          className="w-full  mb-8 lg:mb-0  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 "
        >
            <div className='flex flex-col items-start justify-start p-10'>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-800 mb-4 uppercase">
                  POURQUOI NOUS CHOISIR?
              </h2>
              <div className='mt-5 border-b-4 border-yellow-500 w-44'></div>
              <div className='mt-5'>
              <p className="text-base md:text-lg text-gray-700 mb-6">Nous proposons une variété d'options de logement spécialement conçues pour répondre aux besoins des étudiants, allant des résidences universitaires modernes aux logements en colocation conviviaux.</p>
              </div>
              <Link href="/a-propos">
                
                <button
                     className="bg-emerald-800 text-white lg:py-8 py-4 lg-px-16 px-6 rounded-full hover:bg-emerald-700 transition-transform duration-300"
                    >
                    NOS COMPÉTENCES EN ACTION
                </button>
            </Link>
            </div>
            
            <div className="w-full">
                <img src="/image22.jpg" alt="Alverno Difference" className="w-full rounded-lg shadow-lg" />
            </div>
        </motion.div>
        </section>
  );
}
