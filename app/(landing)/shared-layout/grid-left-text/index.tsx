import Image from "next/image";
const GridLeftText = (params: any) => {
  const { image, title, body } = params;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-12">
      <Image
        src={image}
        alt=""
        width={500}
        height={500}
        className="w-full object-cover rounded-lg order-last drop-shadow-xl hover:scale-105 transition-transform ease-in-out"
      />
      <div className="flex flex-col justify-center items-start md:pr-20 gap-8">
        <h1 className="text-5xl font-bold text-emerald-700">{title}</h1>
        <div
          className="md:text-xl text-zinc-700 text-justify mb-10 md:mb-0"
          dangerouslySetInnerHTML={{ __html: body }}
        ></div>
      </div>
    </div>
  );
};

export default GridLeftText;
