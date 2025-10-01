// components/HeroSection.tsx
'use client'
import React, { useState } from 'react';

const HeroSection: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
  };

  return (
    <div className="bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <dd className="text-5xl font-extrabold text-gray-900">TOP 1</dd>
              <dt className="mt-2 text-lg leading-6 font-medium text-gray-500">Professeurs des classes préparatoires</dt>
              <p className="mt-1 text-sm text-gray-400">Notre corps professoral est trié sur le volet. Nous avons les enseignants les plus talentueux et expérimentés du Maroc.</p>
            </div>
            <div className="text-center">
              <dd className="text-5xl font-extrabold text-gray-900">+25 ans</dd>
              <dt className="mt-2 text-lg leading-6 font-medium text-gray-500">D'expérience d'enseignement superieure</dt>
              <p className="mt-1 text-sm text-gray-400">Cette expérience se traduit par une parfaite maîtrise des programmes et des techniques d'enseignement les plus efficaces.</p>
            </div>
            <div className="text-center">
              <dd className="text-5xl font-extrabold text-gray-900">+12.000</dd>
              <dt className="mt-2 text-lg leading-6 font-medium text-gray-500">Satisfaction des étudiants</dt>
              <p className="mt-1 text-sm text-gray-400">Votre bien-être est notre priorité. Nous réalisons régulièrement des enquêtes de satisfaction auprès des étudiants.</p>
            </div>
            <div className="text-center">
              <dd className="text-5xl font-extrabold text-gray-900">98%</dd>
              <dt className="mt-2 text-lg leading-6 font-medium text-gray-500">Taux de réussite record</dt>
              <p className="mt-1 text-sm text-gray-400">Ce chiffre témoigne de l'efficacité de notre approche pédagogique et de la qualité de l'enseignement dispensé.</p>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Préparez-vous à conquérir les grandes écoles d'ingénieur : Recevez un avant-goût de nos cours par email !
            </h2>
            <form onSubmit={handleSubmit} className="mt-8 sm:flex">
              <input
                type="email"
                placeholder="Votre E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500 sm:max-w-xs"
              />
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <button
                  type="submit"
                  className="block w-full py-3 px-5 bg-emerald-600 text-white font-medium rounded-md shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Demander l'aperçu
                </button>
              </div>
            </form>
            <div className="mt-6 flex items-center space-x-4">
              <span className="text-gray-500">S'abonner à la newsletter</span>
              <span className="text-gray-500">Recevez un avant-goût</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
