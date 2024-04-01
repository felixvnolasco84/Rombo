import { Stripe } from "stripe";

import Image from "next/image";
import PricingItem, { PricingItemType } from "./PricingItem";

import Computer from "@/public/svg/Computer.svg";
import Phone from "@/public/svg/Phone.svg";
import { Button } from "../ui/button";
import CarrouselPlans from "../Carrousel/CarrouselPlans";

async function loadPrices() {
  const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY || "");
  const prices = await stripe.prices.list();
  const sortedPrices = prices.data.sort(
    (a, b) => (a.unit_amount || 0) - (b.unit_amount || 0)
  );
  return sortedPrices;
}

export default async function PricingSection() {

  const plans = await loadPrices();

  const firstPrice = plans[0];

  const secondPrice = plans[1];

  const thirdPrice = plans[2];

  const pricingItems: PricingItemType[] = [
    {
      plan: "Standard",
      amount: 14900,
      pageLink: "#",
      phoneLink: "#",
      priceId: firstPrice.id,
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
      priceId: secondPrice.id,
      hasPromotion: true,
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
      priceId: thirdPrice.id,
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


  return (
    <div className="lg:py-6 xl:py-12">
      <div className="py-12">
        <h3 className="text-[#121415] text-center text-xl md:text-2xl lg:text-5xl xl:text-6xl">
          Niveles de membresía
        </h3>
        <p className="lg:block hidden lg:mb-5 xl:mb-10 text-center text-xl lg:text-2xl xl:text-3xl">
          Elige un plan que sea adecuado para ti.
        </p>
      </div>

      <div className="gap-4 hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pricingItems.map((item, index) => (
          <PricingItem key={index} item={item} />
        ))}
        <div className="flex flex-col border-gray-100 shadow-xl p-9 border rounded-xl">
          <div className="flex flex-col justify-center items-center h-1/2 text-center">
            <div className="relative lg:mb-3 xl:mb-6 w-1/2 aspect-square">
              <Image
                src={Computer}
                alt="Check Icon"
                fill
                className="object-center object-fill"
              />
            </div>
            <p className="text-lg lg:text-xl xl:text-2xl">
              Webflow Development
            </p>
            <p className="mt-2 text-sm lg:text-sm">
              Desarrollamos sitios web a medida con un enfoque en UX/UI.
            </p>
            <Button className="lg:mt-3 xl:mt-6" variant="primary" size="lg">
              Agenda una llamada
            </Button>
          </div>
          <div className="flex flex-col justify-center items-center border-[#C8FA70] lg:pt-3 xl:pt-6 border-t-2 h-1/2 text-center">
            <div className="relative lg:mb-3 xl:mb-6 w-1/2 aspect-square">
              <Image
                src={Phone}
                alt="Check Icon"
                fill
                className="object-center object-fill"
              />
            </div>
            <p className="text-lg lg:text-xl xl:text-2xl">Agenda una llamada</p>
            <p className="mt-2 text-sm lg:text-sm">
              Descubre más sobre cómo funciona rombo y cómo puede ayudarte.
            </p>
            <Button className="mt-6 lg:mt-3" variant="primary" size="lg">
              Agenda una llamada
            </Button>
          </div>
        </div>
      </div>

      <CarrouselPlans pricingItems={pricingItems} />
    </div>
  );
}
