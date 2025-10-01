const FeatureSection = () => {
  const buttons = [
    {
      id: 0,
      handle: "logement",
      img: "/bed.svg",
      frame: "/loge.jpg",
      text: "Nous proposons une variété d'options de logement spécialement conçues pour répondre aux besoins des étudiants, allant des résidences universitaires modernes aux logements en colocation conviviaux.",
      cta: "Logement sécurisé",
    },
    {
      id: 1,
      handle: "laboratoire",
      img: "/labo.svg",
      frame: "/heroimg.webp",
      text: "Nos laboratoires offrent un environnement d'apprentissage moderne et pratique, équipé d'une large gamme d'équipements de pointe. Ces espaces préparent les étudiants à réussir dans un monde professionnel en constante évolution.",
      cta: "Laboratoire de qualité",
    },
    {
      id: 2,
      handle: "excellence",
      img: "/books.svg",
      frame: "/about.jpg",
      text: "Les CPGE IBN ELKHATIB sont réputées pour leurs professeurs d'élite qui sont dévoués à leur succès et veillent à ce que chaque étudiant bénéficie d'une attention individuelle pour maximiser son potentiel.",
      cta: "Excellence pédagogique",
    },
  ];
  return (
    <div className="">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {buttons.map((button:any) => (
        <div
          key={button.id}
          className="relative flex flex-col items-center w-full mb-2 group"
        >
          <div className="rounded-full w-[300px] text-center text-emerald-800  cursor-pointer border-2 border-emerald-600 py-4 px-8 text-lg relative overflow-hidden  bg-white  shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-emerald-800 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-emerald-800 after:duration-500 hover:text-white hover:shadow-emerald-800 hover:before:h-2/4 hover:after:h-2/4">
            <span className="relative z-10">{button.cta}</span>
          </div>

          {/* Popup */}
          <div className="absolute bottom-full mb-4 p-4 w-64 text-white text-center bg-emerald-800 rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none z-20">
            {button.text}
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-10px] w-0 h-0 border-t-8 border-t-emerald-800 border-l-8 border-l-transparent border-r-8 border-r-transparent"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default FeatureSection;
