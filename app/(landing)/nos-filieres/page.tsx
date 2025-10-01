import Footer from "../components/footer";
import SharedHeroSection from "../shared-layout/hero";
import Expolre from "../components/body/welcome/page1"

const NosFilieres = () => {
    return ( 
        <>
            <SharedHeroSection image="/studentsInLaboraty2.jpg" title="Nos Filieres" description="Nos filières spécialisées sont conçues pour préparer efficacement les étudiants aux concours des grandes écoles d'ingénieurs. Grâce à un programme rigoureux, des cours adaptés et un encadrement personnalisé, nous offrons aux futurs ingénieurs les outils nécessaires pour exceller dans leurs examens d'entrée. Chaque parcours est structuré." />
            <div className="">
            <Expolre />
            </div>
        </>
     );
}
 
export default NosFilieres;