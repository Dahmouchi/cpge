const AboutUs = () => {
  return (
    <div className=" pt-32 md:mt-0 sm:pt-40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
          <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
            <h2 className="text-3xl font-bold tracking-tight text-emerald-800 sm:text-4xl">
              CPGE Ibn Elkhatib - RABAT
            </h2>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              Notre établissement vise à instaurer un équilibre harmonieux entre
              la rigueur académique et l&apos;épanouissement personnel, offrant ainsi
              à nos étudiants une préparation complète pour briller dans leurs
              parcours éducatifs et professionnels à venir.
            </p>
            <p className="mt-6 text-lg leading-7 text-gray-900">
              Inscrivez-vous avant le <strong>30 Juin</strong> pour bénéficier d&apos;une réduction d&apos;un montant de <strong>10.000MAD</strong>.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="#pre-inscription"
                className="flex w-full items-center justify-center transition-all ease-in-out rounded-md bg-emerald-700 px-3.5 py-2.5 text-sm font-semibold text-white hover:text-emerald-700 hover:border-emerald-800 border shadow-sm hover:bg-white hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
              >
                Inscrivez-vous dès maintenant
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
            <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
              <img
                src="/about.jpg"
                alt=""
                className="aspect-[7/5] w-[37rem] rounded-2xl bg-white object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
