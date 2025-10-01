import { TbMathSymbols } from "react-icons/tb";
import { SlChemistry } from "react-icons/sl";

export default function NosFilieres() {
  return (
    <div className=" pt-24 sm:pt-32">
      <div className="mx-auto px-6 lg:px-24 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <h2 className="text-left text-4xl font-bold leading-8 text-emerald-800 uppercase">
            Nos filières
          </h2>
          <p className="text-left text-base font-normal pt-4 leading-6 text-emerald-800">
            Que vous soyez intéressé par les mathématiques, physique-chimie ou les sciences de l&apos;ingénierie, nous avons une filière adaptée à vos
            ambitions. Nos enseignants hautement qualifiés fournissent un
            encadrement personnalisé pour aider les étudiants à atteindre leur
            plein potentiel académique.
            <br />
            <br />
            En combinant un enseignement de qualité avec un soutien
            individualisé, nous sommes fiers de préparer nos étudiants à réussir
            brillamment les concours et à accéder aux meilleures écoles d&apos;ingénierie en France et au Maroc.
          </p>
          <img
            src="/about2.jpg"
            className="object-cover min-h-60 max-h-80 w-full mt-6 mb-6 md:m-0 rounded-xl"
            alt=""
          />
        </div>
        <div className="w-full md:w-1/2 grid grid-cols-1 justify-center gap-8 px-4 sm:rounded-2xl md:grid-cols-2">
          <div className="transition-all ease-in-out bg-emerald-700 border border-emerald-800 p-8 sm:p-10 rounded-lg text-white hover:bg-white hover:text-emerald-700">
            <h2 className="text-center text-base font-medium">Bac+1</h2>
            <h2 className="text-center text-5xl font-bold ">MPSI</h2>
            <p className="text-center text-base font-medium py-4">
              <b>Filières acceptées :</b><br /> Bac Sciences Maths A/B
            </p>
            <div className="flex justify-center items-center">
              <TbMathSymbols className="text-7xl" />
            </div>
          </div>
          <div className="transition-all ease-in-out bg-emerald-700 border border-emerald-800 p-8 sm:p-10 rounded-lg text-white hover:bg-white hover:text-emerald-700">
            <h2 className="text-center text-base font-medium">Bac+1</h2>
            <h2 className="text-center text-5xl font-bold ">PCSI</h2>
            <p className="text-center text-base font-medium py-4">
              <b>Filières acceptées :</b> <br /> Bac Sciences-maths A/B
            </p>
            <div className="flex justify-center items-center">
              <SlChemistry className="text-7xl" />
            </div>
          </div>
          <div className="transition-all ease-in-out bg-emerald-700 border border-emerald-800 p-8 sm:p-10 rounded-lg text-white hover:bg-white hover:text-emerald-700">
            <h2 className="text-center text-base font-medium">Bac+2</h2>
            <h2 className="text-center text-5xl font-bold ">MP</h2>
            <p className="text-center text-base font-medium py-4">
              Maths et Physique
            </p>
            <div className="flex justify-center items-center">
              <TbMathSymbols className="text-7xl" />
            </div>
          </div>
          <div className="transition-all ease-in-out bg-emerald-700 border border-emerald-800 p-8 sm:p-10 rounded-lg text-white hover:bg-white hover:text-emerald-700">
            <h2 className="text-center text-base font-medium">Bac+2</h2>
            <h2 className="text-center text-5xl font-bold ">PSI</h2>
            <p className="text-center text-base font-medium py-4">
              Physique et Sciences de l&apos;ingénierie
            </p>
            <div className="flex justify-center items-center">
              <SlChemistry className="text-7xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
