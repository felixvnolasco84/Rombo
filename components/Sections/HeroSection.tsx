import { Button } from "../ui/button";
import Alien from "@/public/svg/Alien.svg";
import Smile from "@/public/svg/Smile.svg";
import Check from "@/public/svg/Check.svg";
import Phone from "@/public/svg/Phone.svg";
import Money from "@/public/svg/Money.svg";

import { HeroItem } from "@/lib/utils";
import HeroCard from "./HeroSection/HeroCard";
import HeroCardHorizontal from "./HeroSection/HeroCardHorizontal";
import Image from "next/image";

export const heroItems: HeroItem[] = [
  {
    title: "Nuestro trabajo",
    description: "Logos, redes, páginas y más.",
    backgroundColor: "bg-[#F2F2F2]",
    image: Alien,
    link: "#",
  },
  {
    title: "Beneficios",
    backgroundColor: "bg-[#C7A7FF]",
    description: "Simples, creativos, tuyos.",
    image: Smile,
    link: "#",
  },
  {
    title: "Planes",
    backgroundColor: "bg-[#C8FA6F]",
    description: "A tu medida.",
    image: Check,
    link: "#",
  },
  {
    title: "Agenda una llamada",
    description: "Descubre cómo funciona y cómo podemos ayudarte.",
    backgroundColor: "bg-[#F2F2F2]",
    image: Phone,
    link: "#",
    buttonText: "Agendar",
  },
  {
    title: "Refiere a un amigo",
    description:
      "Gana comisiones mensuales recurrentes del 5% por cada referencia.",
    backgroundColor: "bg-[#F2F2F2]",
    image: Money,
    link: "#",
    buttonText: "Únete",
  },
];

const firstItem = heroItems[0];

export default function HeroSection() {
  return (
    <div className="lg:gap-3 xl:gap-6 grid grid-cols-1 lg:grid-cols-4 grid-rows-2">
      <div className="flex items-end col-span-2 row-span-2 bg-[#1214151A] rounded-lg overflow-hidden">
        <div className="flex flex-col items-center lg:items-start shadow-lg px-4 lg:px-4 xl:px-9 py-12 lg:py-6 xl:pb-9 h-fit">
          <div className="relative lg:hidden mb-12 w-[68px] h-[54px]">
            <Image
              src={Smile}
              alt="Check Icon"
              fill
              className="mb-12 object-cover"
              sizes="(100vw - 2rem) 100vh"
            />
          </div>
          <h1 className="mb-4 lg:mb-3 xl:mb-6 w-11/12 lg:w-11/12 text-3xl text-center lg:text-left lg:text-4xl xl:text-6xl">
            Somos una agencia de diseno, pero diferente.
          </h1>
          <p className="mb-8 lg:mb-3 xl:mb-6 text-center text-xs lg:text-left lg:text-base xl:text-lg">
            Suscripciones de diseño para todos. Pausa o cancela en cualquier
            momento.
          </p>
          <Button className="w-fit" variant={"primary"} size={"xl"}>
            Ver planes
          </Button>
          <p className="mt-4 lg:mt-2 xl:mt-4 pl-2 text-[9px] xl:text-sm">
            Si no te encantan, te reembolsamos.
          </p>
        </div>
      </div>

      <HeroCard expand={true} item={firstItem} />

      {heroItems.slice(1, 3).map((item, index) => (
        <HeroCard key={item.title} expand={false} item={item} />
      ))}
    </div>
  );
}
