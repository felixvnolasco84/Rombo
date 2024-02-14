import { CarrouselCardProps } from "@/lib/utils";
import Image from "next/image";

export default function CarrouselCard({ item }: { item: CarrouselCardProps }) {
  return (
    <div className="group relative aspect-square min-h-[300px] min-w-[300px] transform cursor-pointer overflow-hidden rounded-xl shadow-lg lg:min-h-[400px] lg:min-w-[400px] xl:min-h-[600px] xl:min-w-[600px]">
      <Image
        src={item.secondImage}
        alt={""}
        fill
        className="object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-100"
        sizes="(100vw - 2rem) 100vh"
      />

      <Image
        src={item.image}
        alt={""}
        fill
        className="object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-0"
        sizes="(100vw - 2rem) 100vh"
      />
    </div>
  );

  }