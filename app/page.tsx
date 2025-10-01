"use client"
import { useRouter } from "next/navigation";
import Header from "./(landing)/components/Nav2/page";
import HeroSection from "./(landing)/components/body/hero-section";
import PreInscriptions from "./(landing)/components/body/pre-inscription";
import Footer from "./(landing)/components/footer";

export default function Home() {

   const router = useRouter();
  const tes = true;
  if (tes) { 
    router.push('/admin');
  }
  return (
    <>
      <div className="fixed w-full top-0 left-0 z-50">
       <Header />
      </div>
      <div className="mt-16">
      <HeroSection />
      </div>
      {/*<SecondPart />*/}
      <PreInscriptions />
      <div className="px-12 md:px-24 space-y-10 my-24">
        <h2 className="text-left text-5xl font-bold text-emerald-800 uppercase">
         Où nous trouvons
        </h2>
        <h3 className="text-lg">
          Située en plein cœur de Rabat Hassan, notre CPGE offre un accès
          privilégié au dynamisme de la capitale. Avec ses installations
          modernes, nous sommes fiers d&apos;être au service de
          l&apos;excellence éducative, offrant un environnement propice à votre
          développement académique et personnel. Venez nous rendre visite et
          découvrez tout ce que notre institution peut vous offrir!
        </h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26456.15846448353!2d-6.861228092077467!3d34.017702500000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76bdb233a118b%3A0x8087e29a5898d189!2sCPGE%20Ibn%20El%20Khatib!5e0!3m2!1sfr!2sma!4v1715628888494!5m2!1sfr!2sma"
          width="800"
          className="w-full"
          height="600"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Footer />
    </>
  );
}
