import { carrouselItems } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import CarrouselCard from "./CarrouselCard";

export default function Carrousel() {
  return (
    <Carousel>
      <CarouselContent className="w-11/12">
        {carrouselItems.map((item, index) => (
          <CarouselItem className="basis-full md:basis-1/2 cursor-grab" key={index}>
            <CarrouselCard key={index} item={item} />
          </CarouselItem>

        ))}


      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
    // <div className="flex gap-4 overflow-x-auto carrousel">
    //   {carrouselItems.map((item, index) => (
    //     <CarrouselCard key={index} item={item} />
    //   ))}
    // </div>
  );
}
