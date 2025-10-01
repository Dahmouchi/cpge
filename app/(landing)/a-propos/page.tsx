import Footer from "../components/footer";
import GridLeftText from "../shared-layout/grid-left-text";
import GridRightText from "../shared-layout/grid-right-text";
import SharedHeroSection from "../shared-layout/hero";

const aProposPage = () => {
  return (
    <>
      <div className="space-y-10">
        <SharedHeroSection
          image="/studentsInLibrary.jpg"
          title="À Propos"
          description="Notre établissement vise à instaurer un équilibre harmonieux entre la rigueur académique et l'épanouissement personnel, offrant ainsi à nos étudiants une préparation complète pour briller dans leurs parcours éducatifs et professionnels à venir."
        />
        <GridLeftText
          image="/about2.jpg"
          title="CPGE IBN EL KHATIB"
          body="Bienvenue à la Classe Préparatoire aux Grandes Écoles (CPGE) IBN EL KHATIB, située au cœur de la capitale marocaine, Rabat. Notre établissement est dédié à l'excellence académique et à la préparation rigoureuse des étudiants pour les concours des grandes écoles d'ingénieurs et de commerce, tant au niveau national qu'international."
        />
        <GridRightText
          image="/image22.jpg"
          title="NOTRE MISSION"
          body="À la CPGE IBN EL KHATIB, notre mission est de fournir une éducation de haute qualité qui prépare nos étudiants à exceller dans leurs études supérieures et à devenir des leaders dans leurs domaines respectifs. Nous nous engageons à offrir un environnement d'apprentissage stimulant et enrichissant, favorisant à la fois le développement intellectuel et personnel de nos étudiants."
        />
        <GridLeftText
          image="/image33.jpg"
          title="NOTRE PÉDAGOGIE"
          body={`Nous croyons fermement que la pédagogie est la clé de la réussite de nos étudiants. 
          Notre approche pédagogique se distingue par plusieurs éléments fondamentaux : 
          <ul class="list-disc list-inside ml-4 mt-4">
            <li class="mb-2">Approche individualisée</li>
            <li class="mb-2">Enseignement interactif</li>
            <li class="mb-2">Évaluation continue</li>
            <li class="mb-2">Utilisation de technologies modernes</li>
          </ul>`}
        />
      </div>
    </>
  );
};

export default aProposPage;
