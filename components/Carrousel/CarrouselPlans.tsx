import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import PricingItem, { PricingItemType } from "../Pricing/PricingItem";

export default function CarrouselPlans({ pricingItems }: { pricingItems: PricingItemType[] }) {
  return (
    <Carousel className="lg:hidden">
      <CarouselContent className="w-11/12">
        {pricingItems.map((item, index) => (
          <CarouselItem className="basis-full md:basis-1/2 cursor-grab" key={index}>
            <PricingItem key={index} item={item} />
          </CarouselItem>

        ))}
      </CarouselContent>
    </Carousel>

  );
}
