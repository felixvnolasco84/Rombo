import CTAContact from "@/components/CTA/CTAContact";
import CTATrial from "@/components/CTA/CTATrial";
import Carrousel from "@/components/Carrousel/Carrousel";
import FAQComponent from "@/components/FAQ/FAQComponent";
import Features from "@/components/Features/Features";
import PricingSection from "@/components/Pricing/PricingSection";
import HeroSection from "@/components/Sections/HeroSection";
import SloganComponent from "@/components/Slogan/SloganComponent";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="relative flex flex-col gap-4 pb-6 lg:gap-7">
      <HeroSection />
      <CTATrial />
      <Carrousel />
      <Features />
      <PricingSection />
      <SloganComponent />
      <CTAContact />
      <FAQComponent />
      <WhatsAppButton />
    </div>
  );
}
