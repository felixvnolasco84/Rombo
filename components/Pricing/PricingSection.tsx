import Image from "next/image";
import PricingItem, { PricingItemType } from "./PricingItem";
import Smile from "@/public/svg/Alien.svg";
import { Button } from "../ui/button";

export const pricingItems: PricingItemType[] = [
  {
    plan: "Standard",
    amount: 14900,
    pageLink: "#",
    phoneLink: "#",
    features: [
      {
        title: "Gráficos de Redes Sociales",
        included: true,
      },
      {
        title: "Papelería, Infografías, Folletos",
        included: true,
      },
      {
        title: "Fotos de Stock Ilimitadas",
        included: true,
      },
      {
        title: "Papelería, Infografías, Folletos",
        included: true,
      },
      {
        title: "Presentaciones",
        included: true,
      },
      {
        title: "Fotos de Stock Ilimitadas",
        included: false,
      },
      {
        title: "Reels y Motion Graphics",
        included: false,
      },
      {
        title: "Branding & Logotipos",
        included: false,
      },
      {
        title: "Ilustraciones",
        included: false,
      },
      {
        title: "Páginas Web",
        included: false,
      },
    ],
  },

  {
    plan: "Premium",
    amount: 24900,
    pageLink: "#",
    phoneLink: "#",
    features: [
      {
        title: "Gráficos de Redes Sociales",
        included: true,
      },
      {
        title: "Papelería, Infografías, Folletos",
        included: true,
      },
      {
        title: "Fotos de Stock Ilimitadas",
        included: true,
      },
      {
        title: "Papelería, Infografías, Folletos",
        included: true,
      },
      {
        title: "Presentaciones",
        included: true,
      },
      {
        title: "Fotos de Stock Ilimitadas",
        included: true,
      },
      {
        title: "Reels y Motion Graphics",
        included: true,
      },
      {
        title: "Branding & Logotipos",
        included: true,
      },
      {
        title: "Ilustraciones",
        included: false,
      },
      {
        title: "Páginas Web",
        included: false,
      },
    ],
  },
  {
    plan: "Pro",
    amount: 39900,
    pageLink: "#",
    phoneLink: "#",
    features: [
      {
        title: "Gráficos de Redes Sociales",
        included: true,
      },
      {
        title: "Papelería, Infografías, Folletos",
        included: true,
      },
      {
        title: "Fotos de Stock Ilimitadas",
        included: true,
      },
      {
        title: "Papelería, Infografías, Folletos",
        included: true,
      },
      {
        title: "Presentaciones",
        included: true,
      },
      {
        title: "Fotos de Stock Ilimitadas",
        included: true,
      },
      {
        title: "Reels y Motion Graphics",
        included: true,
      },
      {
        title: "Branding & Logotipos",
        included: true,
      },
      {
        title: "Ilustraciones",
        included: true,
      },
      {
        title: "Páginas Web",
        included: true,
      },
    ],
  },
];
export default function PricingSection() {
  return (
    <div className="lg:py-6 xl:py-12">
      <h3 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl">
        Niveles de membresía
      </h3>
      <p className="text-center text-base lg:mb-5 lg:text-lg xl:mb-10 xl:text-xl">
        Elige un plan que sea adecuado para ti.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pricingItems.map((item, index) => (
          <PricingItem key={index} item={item} />
        ))}
        <div className="flex flex-col rounded-xl border border-gray-100 p-8 shadow-xl">
          <div className="flex h-1/2 flex-col items-center text-center">
            <div className="relative lg:mb-3 lg:h-[54px] lg:w-[68px] xl:mb-6 xl:h-[108px] xl:w-[136px]">
              <Image
                src={Smile}
                alt="Check Icon"
                fill
                className="object-cover object-center"
              />
            </div>
            <p className="text-lg lg:text-xl xl:text-2xl">
              Webflow Development
            </p>
            <p className="text-sm lg:text-sm xl:text-base">
              Desarrollamos sitios web a medida con un enfoque en UX/UI.
            </p>
            <Button className="lg:mt-3 xl:mt-6" variant="primary" size="lg">
              Agenda una llamada
            </Button>
          </div>
          <div className="flex h-1/2 flex-col items-center border-t-2 border-[#C8FA70] text-center lg:pt-3 xl:pt-6">
            <div className="relative lg:mb-3 lg:h-[54px] lg:w-[68px] xl:mb-6 xl:h-[108px] xl:w-[136px]">
              <Image
                src={Smile}
                alt="Check Icon"
                fill
                className="object-cover object-center"
              />
            </div>
            <p className="text-lg lg:text-xl xl:text-2xl">Agenda una llamada</p>
            <p className="text-sm lg:text-sm xl:text-base">
              Descubre más sobre cómo funciona rombo y cómo puede ayudarte.
            </p>
            <Button className="mt-6 lg:mt-3" variant="primary" size="lg">
              Agenda una llamada
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
