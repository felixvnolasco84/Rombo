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
};

export type feature = {
  title: string;
  included: boolean;
};

export default function PricingItem({ item }: { item: PricingItemType }) {
  return (
    <div className="col-span-1 rounded-xl border border-gray-100 bg-white px-6 py-10 shadow-xl">
      <h3 className="text-center text-xl md:text-xl lg:text-2xl xl:text-3xl">
        {item.plan}
      </h3>

      <p className="text-center text-xs">
        Pausa o cancela en cualquier momento.
      </p>
      <div className="flex items-center justify-center gap-2 lg:mt-8 xl:mt-16">
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
      <PricingButton priceId={item.priceId} />
      <div className="border-b-2 border-[#C8FA70] lg:pb-5 xl:pb-10">
        <Link href={item.phoneLink}>
          <Button variant="outline" className="mt-2 w-full xl:mt-4" size={"lg"}>
            Agendar una llamada
          </Button>
        </Link>
      </div>

      <div className="pt-10">
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
