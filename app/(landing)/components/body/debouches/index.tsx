export default function Debouches() {
  const LOGOS = [
    { src: "/13.svg", alt: "Logo 13" },
    { src: "/14.svg", alt: "Logo 14" },
    { src: "/15.svg", alt: "Logo 15" },
    { src: "/16.svg", alt: "Logo 16" },
    { src: "/17.svg", alt: "Logo 17" },
    { src: "/18.svg", alt: "Logo 18" },
    { src: "/19.svg", alt: "Logo 19" },
    { src: "/20.svg", alt: "Logo 20" },
  ];

  return (
    <div className="relative m-auto w-[300px] lg:w-[700px] overflow-hidden bg-white before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] after:content-['']">
      <div className="animate-infinite-slider flex w-[calc(250px*10)]">
        {LOGOS.map((logo, index) => (
          <div
            className="slide flex w-[200px] items-center justify-center"
            key={`logo-large-${index}`}
          >
            <img
              src={logo.src}
              className="w-full object-cover"
              alt={logo.alt}
              key={`img-large-${index}`}
            />
          </div>
        ))}
        {LOGOS.map((logo, index) => (
          <div
            className="slide flex w-[125px] items-center justify-center"
            key={`logo-small-${index}`}
          >
            <img
              src={logo.src}
              className="w-full object-cover"
              alt={logo.alt}
              key={`img-small-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
