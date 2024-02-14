import { heroItems } from "../Sections/HeroSection";
import HeroCardHorizontal from "../Sections/HeroSection/HeroCardHorizontal";

export default function CTAContact() {
  return (
    <div className="grid grid-cols-2 grid-rows-1 gap-6 py-12 lg:grid-cols-4">
      {heroItems.slice(3).map((item, index) => (
        <HeroCardHorizontal key={item.title} expand={true} item={item} />
      ))}
    </div>
  );
}
