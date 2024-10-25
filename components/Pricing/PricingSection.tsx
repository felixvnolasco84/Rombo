import { Stripe } from "stripe";

import Image from "next/image";
import PricingItem, { PricingItemType } from "./PricingItem";

import Computer from "@/public/svg/Computer.svg";
import Phone from "@/public/svg/Phone.svg";
import { Button } from "../ui/button";
import CarrouselPlans from "../Carrousel/CarrouselPlans";

async function loadPrices() {
  // const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY || "");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
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
      phoneLink:
        "https://api.whatsapp.com/send?phone=5215545009532&text=Hola!%20Me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20plan%20Standard%20de%20Rombo!",
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
      phoneLink:
        "https://api.whatsapp.com/send?phone=5215545009532&text=Hola!%20Me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20plan%20Premium%20de%20Rombo!",
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
      phoneLink:
        "https://api.whatsapp.com/send?phone=5215545009532&text=Hola!%20Me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20plan%20Pro%20de%20Rombo!",
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
    <>
      {
        <div id="planes">
          <div className="py-12 xl:py-24">
            <h3 className="text-center text-xl font-semibold text-[#121415] md:text-2xl lg:text-5xl xl:text-6xl">
              Niveles de membresía
            </h3>
            <p className="text-center text-sm lg:text-2xl xl:text-3xl">
              Elige un plan que sea adecuado para ti.
            </p>
          </div>

          <div className="hidden grid-cols-1 gap-2 md:grid-cols-2 lg:grid lg:grid-cols-4 xl:gap-4">
            {pricingItems.map((item, index) => (
              <PricingItem key={index} item={item} />
            ))}
            <div className="flex flex-col rounded-xl border border-gray-100 p-3 shadow-xl xl:p-9">
              <div className="flex h-1/2 flex-col items-center justify-center text-center">
                <div className="relative aspect-square w-1/2 lg:mb-3 xl:mb-6">
                  <Image
                    src={Computer}
                    alt="Check Icon"
                    fill
                    className="object-fill object-center"
                  />
                </div>
                <p className="text-lg xl:text-2xl">Webflow Development</p>
                <p className="mt-2 text-xs xl:text-sm">
                  Desarrollamos sitios web a medida con un enfoque en UX/UI.
                </p>
                <Button className="lg:mt-3 xl:mt-6" variant="primary" size="lg">
                  Agenda una llamada
                </Button>
              </div>
              <div className="flex h-1/2 flex-col items-center justify-center border-t-2 border-[#C8FA70] text-center lg:pt-3 xl:pt-6">
                <div className="relative aspect-square w-1/2 lg:mb-3 xl:mb-6">
                  <Image
                    src={Phone}
                    alt="Check Icon"
                    fill
                    className="object-fill object-center"
                  />
                </div>
                <p className="text-lg lg:text-xl xl:text-2xl">
                  Agenda una llamada
                </p>
                <p className="mt-2 lg:text-xs xl:text-sm">
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
      }
    </>
  );
}
