import Image from "next/image";
const GridRightText = (params: any) => {
  const { image, title, body } = params;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-12">
      <Image
        src={image}
        alt=""
        width={500}
        height={500}
        className="w-full object-cover rounded-lg order-first drop-shadow-xl hover:scale-105 transition-transform ease-in-out mb-10 md:mb-0"
      />
      <div className="flex flex-col justify-center items-start md:pl-20 gap-8">
        <h1 className="text-5xl font-bold text-emerald-700">{title}</h1>
        <p className="md:text-xl text-zinc-700 text-justify">
          {body}
        </p>
      </div>
    </div>
  );
};

export default GridRightText;
