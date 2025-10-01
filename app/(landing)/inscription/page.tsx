import React from 'react'
import PreInscriptions from '../components/body/pre-inscription'
import Footer from "../components/footer";
import SharedHeroSection from "../shared-layout/hero";

const page = () => {
  return (
    <div>
         <SharedHeroSection image="/studentsInLaboraty2.jpg" title="INSCRIPTION" description="Rejoignez notre établissement et donnez un coup d’accélérateur à votre préparation pour les concours des grandes écoles d’ingénieurs. Notre processus d'inscription est simple et rapide, et notre équipe est prête à vous accompagner à chaque étape." />
        <PreInscriptions/>
    </div>
  )
}

export default page