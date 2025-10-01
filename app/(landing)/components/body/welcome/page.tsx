import React from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

let slides = [
  { 
    image: "/image11.jpg",
    title: "Préparez votre avenir avec CPGE Rabat IBN EL-KHATIB",
    description: "Les Classes Préparatoires aux Grandes Écoles vous ouvrent les portes des meilleures universités et écoles d'ingénieurs.",
  },
  { 
    image: "/image22.jpg",
    title: "Préparez-vous à conquérir les grandes écoles d'ingénieur",
    description: "Notre établissement vise à instaurer un équilibre harmonieux entre la rigueur académique et l'épanouissement personnel",
  },
  { 
    image: "/image33.jpg",
    title: "CPGE Ibn Elkhatib - RABAT",
    description: "Offrant à nos étudiants une préparation complète pour briller dans leurs parcours éducatifs et professionnels à venir.",
  },
];

const MyCarousel = () => {
  return (
    <Carousel className="w-full lg:h-[650px] h-80" opts={{ loop: true }} >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="relative bg-gray-200">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full lg:h-[650px] h-80 object-cover "
            />
            <div className="absolute bottom-0 h-full flex flex-col justify-center items-center left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
              <div className="lg:w-2/3">
              <h3 className="text-3xl lg:text-6xl font-bold text-center">{slide.title}</h3>
              <p className="text-sm text-center lg:text-3xl">{slide.description}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default MyCarousel
