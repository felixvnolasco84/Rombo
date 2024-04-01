import { heroItems } from "../Sections/HeroSection";
import HeroCardHorizontal from "../Sections/HeroSection/HeroCardHorizontal";

export default function CTAContact() {
  return (
    <div className="gap-6 grid grid-cols-2 lg:grid-cols-4 grid-rows-1">
      {heroItems.slice(3).map((item, index) => (
        <HeroCardHorizontal key={item.title} expand={true} item={item} />
      ))}
    </div>
  );
}
