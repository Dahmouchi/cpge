import * as React from "react"
import CarouselCustomArrows from "../welcome/page"
import Expolre from "../welcome/page1"
import Diff from "../welcome/page2"
import PercentageCounter from "../welcome/page3"
import Message from "../welcome/page4"
import FeatureSection from "../feature-section";
import Debouches from "../debouches";

export default function HeroSection() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 ">
      <CarouselCustomArrows />
      <section className="w-full h-[450px] bg-emerald-800">
        <div className="relative w-full h-[450px]">
          <img 
            src="/bg.png" // Replace with your image path
            alt="About Us"
            className="w-full h-full object-cover opacity-5"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-center  p-4 lg:w-[800px]">
              <h2 className="lg:text-6xl text-4xl font-bold text-yellow-500 ">CPGE me permet d'être moi-même</h2>
              <p className="mt-2 font-sans lg:text-xl text-white leading-10	">
              Notre établissement vise à instaurer un équilibre harmonieux entre
              la rigueur académique et l&apos;épanouissement personnel, offrant ainsi
              à nos étudiants une préparation complète pour briller dans leurs
              parcours éducatifs et professionnels à venir.
                {/* Add more about us information here */}
              </p>
            </div>
          </div>
        </div>
      </section>
      <Expolre />
      <Diff />
      <Message />
      <section className="w-full h-[600px] bg-emerald-800">
        <div className="relative w-full h-[600px]">
          <img
            src="/about2.jpg" // Replace with your image path
            alt="About Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 lg:px-44">
            <div className="text-center  p-4">
              <div className=" flex flex-col justify-center items-center">
                <h2 className="lg:text-6xl font-bold text-emerald-700 text-4xl">Engagement en Diversité et Inclusion</h2>
                <div className='mt-2 border-b-4 border-yellow-500 w-60'></div>
              </div>
              <p className="mt-2 font-sans text-sm lg:text-xl text-black lg:leading-10	 ">
              Nous pensons que l’éducation est enrichie par les perspectives et les expériences uniques de chaque élève, et nous nous engageons à favoriser un environnement qui célèbre et valorise la diversité sous toutes ses formes. Il est au cœur de notre mission d’adopter et d’encourager la diversité, l’équité et l’inclusion (DE&I).
              </p>
              <div className="w-full mt-16">
                <FeatureSection />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center p-8 bg-white mt-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-800 mb-6 uppercase text-center">
        Excellence aux Concours d'Ingénieurs
        </h2>
        <div className='mt-2 border-b-4 border-yellow-500 w-44 mb-8'></div>
        <div className='text-center mt-5  flex flex-col items-center jusc'>
            <h2 className='font-sans text-xl lg:leading-8 w-2/3'>Nos élèves se distinguent par leur excellence académique et leur détermination à réussir. Grâce à un encadrement personnalisé et des ressources pédagogiques de qualité, nous préparons nos étudiants à exceller dans les concours les plus prestigieux. Ces résultats témoignent de leur travail acharné et de notre engagement à les accompagner vers les plus grandes écoles d'ingénieurs.</h2>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-24 mt-12">
          <PercentageCounter targetValue={34} label="Concours Centrale" />
          <PercentageCounter targetValue={37} label="Concours Mines" />
          <PercentageCounter targetValue={80} label="Concours CCINP" />
          <PercentageCounter targetValue={83} label="Concours E3A" />
          <PercentageCounter targetValue={98} label="Concours CNC" />

        </div>
        <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-emerald-800 mb-6 mt-20 uppercase  text-center">
          Nos Étudiants Admis dans les Grandes Écoles
        </h2>
        <Debouches />
      </section>
     
    </div >
  )
}

