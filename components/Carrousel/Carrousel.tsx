import { carrouselItems } from "@/lib/utils";
import CarrouselCard from "./CarrouselCard";

export default function Carrousel() {
  return (
    <div className="flex gap-4 overflow-x-auto">
      {carrouselItems.map((item, index) => (
        <CarrouselCard key={index} item={item} />
      ))}
    </div>
  );
}
