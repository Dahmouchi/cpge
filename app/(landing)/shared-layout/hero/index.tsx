import Image from "next/image";

const SharedHeroSection = (params: any) => {
    const { image, title, description } = params;
    return (
        <section className="w-full h-[400px] bg-emerald-800">
            <div className="relative w-full h-[400px]">
            <img 
                src="/bg.png" // Replace with your image path
                alt="About Us"
                className="w-full h-full object-cover opacity-5"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-center  p-4 lg:w-[800px]">
                <h2 className="lg:text-6xl text-4xl font-bold text-yellow-500 ">{title}</h2>
                <p className="mt-2 font-sans lg:text-xl text-white leading-8 lg:leading-10	">
                    {description}
                </p>
                </div>
            </div>
            </div>
      </section>
     
    );
};

export default SharedHeroSection;
   {/*<div className="relative h-[60vh] w-full z-0">
            <Image 
                src={image} 
                alt={title} 
                layout="fill" 
                objectFit="cover"
                className="z-0"
            />
            <div className="absolute inset-0 bg-emerald-700 opacity-60 z-10"></div>
            <div className="relative h-full w-full flex justify-center items-center flex-col text-center px-10 text-white z-20">
                <h1 className="text-5xl md:text-7xl uppercase font-bold">{title}</h1>
                <p className="text-lg">{description}</p>
            </div>
        </div>*/}