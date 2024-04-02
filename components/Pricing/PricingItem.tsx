import Link from "next/link";
import { Button } from "../ui/button";
import CheckIcon from "@/public/svg/Check.svg";
import Image from "next/image";
import PricingButton from "./PricingButton";

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

export default function PricingItem({ item }: { item: PricingItemType }) {
  return (
    <div className="relative border-gray-100 col-span-1 bg-white shadow-xl px-4 xl:px-6 py-9 xl:py-9 border rounded-xl text-[#121415]">
      {
        item.hasPromotion && (
          <div className="-top-0 lg:-top-8 left-0 absolute bg-[#C7A7FF] px-3 lg:px-5 py-2 lg:py-4 rounded-full text-black text-xs lg:text-base -rotate-6">
            <p className="">Más Popular</p>
          </div>
        )
      }
      <div className="flex flex-col">
        <h3 className="font-semibold text-center text-xl md:text-xl lg:text-2xl xl:text-3xl">
          {item.plan}
        </h3>

        <p className="text-center text-xs">
          Pausa o cancela en cualquier momento.
        </p>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-center items-center gap-2 mt-8 xl:mt-16">
          <p className="text-xl md:text-xl lg:text-2xl xl:text-3xl">
            {item.amount.toLocaleString("es-MX", {
              style: "currency",
              currency: "MXN",
              maximumFractionDigits: 0,
            })}
          </p>
          <div className="text-[#AFAFAF] text-xs">
            <p>mxn</p>
            <p>mensuales</p>
          </div>
        </div>
        <p className="lg:mt-2 xl:mt-3 text-[#AFAFAF] text-center text-xs">
          Pausa o cancela en cualquier momento
        </p>
      </div>


      <div className="flex flex-col gap-4">
        <PricingButton priceId={item.priceId} />
        <div className="flex justify-center border-[#C8FA70] pb-6 xl:pb-12 border-b-2 w-full">
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
            className="flex items-center gap-1 lg:mt-2 xl:mt-4 text-sm xl:text-base"
            key={feature.title}
          >
            <div className="relative w-4 xl:w-5 h-4 xl:h-5">
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
