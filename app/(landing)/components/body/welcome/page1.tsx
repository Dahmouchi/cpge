"use client";

import React from 'react';
import { motion } from 'framer-motion';

const cards = [
  {
    image: '/math.jpg', // Replace with your image path
    title: 'MPSI',
    description: 'Bac Sciences Maths A/B (Bac + 1)',
  },
  {
    image: '/image22.jpg', // Replace with your image path
    title: 'PCSI',
    description: 'Bac Sciences Maths A/B (Bac + 1)',
  },
  {
    image: '/physic.jpg', // Replace with your image path
    title: 'MP',
    description: 'Maths et Physique (Bac + 2)',
  },
  {
    image: '/si.jpg', // Replace with your image path
    title: 'PSI',
    description: 'Physique et Sciences de l ingénierie (Bac + 2)',
  },
];

export default function ImageSection() {
  const variants = {
    hidden: { opacity: 0, y: -20 }, // Start hidden with a slight upward offset
    visible: (i:any) => ({
      opacity: 1,
      y: 0, // Animate to the original position
      transition: {
        delay: i * 0.3, // Stagger the animation for each card
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
    <section className="overflow-hidden my-8">
      <div className="">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={variants}
          className="w-full mb-14"
        >
          <div className='flex flex-col items-center justify-center'>
            <h1 className="text-2xl font-bold leading-tight md:text-5xl  py-8 lg:text-5xl text-emerald-800">
              DÉCOUVREZ NOS PROGRAMMES
            </h1>
            <div className='mt-8 border-b-4 border-yellow-500 w-44'></div>
          </div>
          <div className='text-center mt-5  flex flex-col items-center jusc'>
            <h2 className='font-sans text-xl leading-8 w-2/3'>Que vous soyez intéressé par les mathématiques, physique-chimie ou les sciences de l'ingénierie, nous avons une filière adaptée à vos ambitions. Nos enseignants hautement qualifiés fournissent un encadrement personnalisé pour aider les étudiants à atteindre leur plein potentiel académique.

En combinant un enseignement de qualité avec un soutien individualisé, nous sommes fiers de préparer nos étudiants à réussir brillamment les concours et à accéder aux meilleures écoles d'ingénierie en France et au Maroc.</h2>
          </div>
        </motion.div>
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {cards.map((card:any, index) => (
              <motion.div
                key={index}
                custom={index} // Pass the index as a custom prop
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.5 }}
                variants={variants}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-48 object-cover border-b-4 border-emerald-700"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-gray-600">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
