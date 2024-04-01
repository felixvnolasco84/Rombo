import { CarrouselCardProps } from "@/lib/utils";
import Image from "next/image";

export default function CarrouselCard({ item }: { item: CarrouselCardProps }) {
  return (
    <div className="relative shadow-lg rounded-xl min-w-[300px] lg:min-w-[400px] xl:min-w-[600px] min-h-[300px] lg:min-h-[400px] xl:min-h-[600px] transform overflow-hidden aspect-square group">
      <Image
        src={item.secondImage}
        alt={""}
        fill
        className="group-hover:opacity-100 transition-opacity duration-300 ease-linear object-center object-cover"
        sizes="(100vw - 2rem) 100vh"
      />

      <Image
        src={item.image}
        alt={""}
        fill
        className="group-hover:opacity-0 transition-opacity duration-300 ease-linear object-center object-cover"
        sizes="(100vw - 2rem) 100vh"
      />
    </div>
  );

}