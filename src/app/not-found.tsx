import { images } from "@/shared/images/images";
import Image from "next/image";

export default function Custom404() {
  return <div className="conainer flex h-[calc(100vh-400px)] items-center gap-5 justify-center flex-col">
           <Image src={images.not_found} width={300} height={300} alt="not found"/>
           <p className="text-xl font-semibold mt6">Not found</p>
  </div>
}