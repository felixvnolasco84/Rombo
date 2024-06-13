import Link from "next/link";
import { Button } from "../ui/button";
import CheckIcon from "@/public/svg/Check.svg";
import Image from "next/image";
import PricingButton from "./PricingButton";
import { createCustomerIfNull } from "@/lib/stripeUtils";

export type PricingItemType = {
  plan: string;
  amount: number;
  pageLink: string;
  phoneLink: string;
  features: feature[];
  priceId: string;
  hasPromotion?: boolean;
};

export type feature = {
  title: string;
  included: boolean;
};

export default async function PricingItem({ item }: { item: PricingItemType }) {
  return (
    <div className="relative col-span-1 rounded-xl border border-gray-100 bg-white px-4 py-9 text-[#121415] shadow-xl xl:px-6 xl:py-9">
      {item.hasPromotion && (
        <div className="absolute -top-0 left-0 -rotate-6 rounded-full bg-[#C7A7FF] px-3 py-2 text-xs text-black lg:-top-8 lg:px-5 lg:py-4 lg:text-base">
          <p className="">Más Popular</p>
        </div>
      )}
      <div className="flex flex-col">
        <h3 className="text-center text-xl font-semibold md:text-xl lg:text-2xl xl:text-3xl">
          {item.plan}
        </h3>

        <p className="text-center text-xs">
          Pausa o cancela en cualquier momento.
        </p>
      </div>

      <div className="flex flex-col">
        <div className="mt-8 flex items-center justify-center gap-2 xl:mt-16">
          <p className="text-xl md:text-xl lg:text-2xl xl:text-3xl">
            {item.amount.toLocaleString("es-MX", {
              style: "currency",
              currency: "MXN",
              maximumFractionDigits: 0,
            })}
          </p>
          <div className="text-xs text-[#AFAFAF]">
            <p>mxn</p>
            <p>mensuales</p>
          </div>
        </div>
        <p className="text-center text-xs text-[#AFAFAF] lg:mt-2 xl:mt-3">
          Pausa o cancela en cualquier momento
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* <PricingButton customer_id={customer_id} priceId={item.priceId} /> */}
        <PricingButton priceId={item.priceId} />
        <div className="flex w-full justify-center border-b-2 border-[#C8FA70] pb-6 xl:pb-12">
          <Link href={item.phoneLink} className="mx-auto">
            <Button variant="CTAUnderline" size={"underline"}>
              Agendar una llamada
            </Button>
          </Link>
        </div>
      </div>

      <div className="pt-5 xl:pt-10">
        {item.features.map((feature) => (
          <div
            className="flex items-center gap-1 text-sm lg:mt-2 xl:mt-4 xl:text-base"
            key={feature.title}
          >
            <div className="relative h-4 w-4 xl:h-5 xl:w-5">
              {feature.included && (
                <Image src={CheckIcon} alt={feature.title} />
              )}
            </div>

            <p
              className={feature.included ? "" : "line-through text-[#AFAFAF]"}
            >
              {feature.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
