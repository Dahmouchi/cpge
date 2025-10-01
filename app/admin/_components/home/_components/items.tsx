import Image from "next/image";
import style from "../home.module.css"
const items = ({number,type,img}:any) => {
  return (
    <div className={style.item}>
          <div className="">
            <h3 className="text-2xl font-bold rounded-full text-gray-700">
              {number}
            </h3>
            <h3 className="rounded-full text-gray-500">
              {type}
            </h3>
          </div>
          <div>
            <Image src={`${img}`} width={70} height={70} alt="etudiant"/>
          </div>
        </div>
  )
}

export default items