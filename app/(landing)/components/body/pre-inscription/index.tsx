import Form from "../form";

const PreInscriptions = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center" id="pre-inscription">
      {/* Background Image */}
      <img 
        src="/heroimg.webp" // Replace with your image path
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-white-800 bg-white opacity-80"></div>
      {/* Content */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-full px-4 py-8 mx-auto space-y-8 md:flex-row md:space-y-0 md:items-center md:py-16 md:px-8 lg:px-12 text-white">
        <div className="w-full max-w-2xl">
          <div className="text-md md:text-lg">
            <h1 className="text-2xl md:text-5xl leading-tighter font-thin uppercase text-emerald-800">
              Si votre <span className="font-bold">moyenne générale</span> de
              bac est :
            </h1>
            <div className="h-1 w-2/3 bg-emerald-100 mt-3"></div>
          </div>
          <div className="space-y-2 mt-8 text-emerald-800">
            <h1>
              <strong className="text-2xl text-emerald-800">
                Inférieure à 12
              </strong>
              :
            </h1>
            <div className="ml-6">
              Vous serez admis après un{" "}
              <strong className="text-emerald-800">test.</strong>
            </div>
            <h1>
              <strong className="text-2xl text-emerald-800">
                Supérieure à 12
              </strong>
              :
            </h1>
            <div className="ml-6">
              Vous serez admis directement{" "}
              <strong className="text-emerald-800">sans test.</strong>
            </div>
            <h1>
              <strong className="text-2xl text-emerald-800">
                Supérieure à 16
              </strong>
              :
            </h1>
            <div className="ml-6">
              Bénéficiez d'une{" "}
              <strong className="text-emerald-800">bourse complète</strong> ou{" "}
              <strong className="text-emerald-800">partielle.</strong>
            </div>
          </div>
          <div className="mt-6 text-lg lg:text-2xl pr-12 text-emerald-800">
            <strong className="text-2xl md:text-4xl lg:text-5xl text-emerald-800">
              Qu&apos;attendez-vous ? <br />
            </strong>
            Réservez dès maintenant votre place au sein de notre établissement.
          </div>
        </div>
        <Form />
      </div>
    </div>
  );
};

export default PreInscriptions;
