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
    <div id="nuestro-trabajo">
      <Carousel>
        <CarouselContent className="w-11/12">
          {carrouselItems.map((item, index) => (
            <CarouselItem className="basis-full md:basis-1/2 cursor-grab" key={index}>
              <CarrouselCard key={index} item={item} />
            </CarouselItem>

          ))}
        </CarouselContent>
      </Carousel>
    </div>


  );
}
