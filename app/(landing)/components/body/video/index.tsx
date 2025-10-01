"use client";
import Image from "next/image";
import { PlayIcon } from "@heroicons/react/24/solid";
import { Atom, Bed, Book } from "lucide-react";

export default function InfoSection() {
    return (
        <div className="px-[12px] md:px-40 mt-[120px] lg:mt-[234px]">
        <div className="rounded-2xl p-[30px] md:py-[53px] md:px-[48px] bg-emerald-600">
          <div className="relative mx-auto max-w-[1190px] -translate-y-[50%] md:-translate-y-[30%] mb-[-50px]">
            <video
              className="h-full w-full object-cover rounded-2xl" src="https://file-examples.com/storage/fe9f6f893066954d9aac3a2/2017/04/file_example_MP4_480_1_5MG.mp4">
                </video>
            
          </div>
          <div className="lg:flex lg:items-center gap-[30px]">
            <div className="flex items-start gap-5 transition-all duration-300 mb-[33px] hover:translate-y-[-3px] last:mb-0">
              <Bed />
              <div>
                <h3 className="font-bold font-chivo text-[20px] leading-[26px] md:text-heading-4 mb-[14px] text-white">1. Plateforme e-learning innovante
                </h3>
                <p className="text-excerpt text-white">Cours en ligne, exercices corrigés, forum pour un apprentissage flexible et approfondi.</p>
              </div>
            </div>
            <div className="flex items-start gap-5 transition-all duration-300 mb-[33px] hover:translate-y-[-3px] last:mb-0">
            <Atom />
              <div>
                <h3 className="font-bold font-chivo text-[20px] leading-[26px] md:text-heading-4 mb-[14px] text-white">2. Accompagnement personnalisé
                </h3>
                <p className="text-white text-excerpt">Tutorat individuel, conseiller pédagogique dédié pour un soutien optimal.</p>
              </div>
            </div>
            <div className="flex items-start gap-5 transition-all duration-300 mb-[33px] hover:translate-y-[-3px]">
                <Book />
              <div>
                <h3 className="font-bold font-chivo text-[20px] leading-[26px] md:text-heading-4 mb-[14px] text-white">3. Campus stimulant
                </h3>
                <p className="text-excerpt text-white">Salles de classe modernes, laboratoires high-tech, espaces de vie conviviaux pour une expérience enrichissante.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
