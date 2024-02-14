import { Button } from "../ui/button";
import Logo from "@/public/svg/Logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function FooterComponent() {
  return (
    <div className="bg-[#C8FA6F] py-12 text-[#121415]">
      <div className="mx-auto w-1/2">
        <h3 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          Descubre si rombo es para ti.
        </h3>
        <p className="text-center text-sm lg:text-lg xl:text-xl">
          Prueba un plan por 5 días ó habla con nosotros.
        </p>

        <div className="mt-6 flex flex-col justify-around gap-4 lg:flex-row lg:gap-0 xl:mt-12">
          <Button className="mr-4" variant="secondary" size="lg">
            Comenzar gratis
          </Button>
          <Button className="mr-4" variant="secondary" size="lg">
            Agenda una llamada
          </Button>
        </div>
        <p className="mx-auto mt-3 w-full text-center text-xs lg:w-3/4 lg:text-sm xl:mt-6 xl:text-base">
          Descubre cómo tú y tu equipo pueden cambiar la forma en que obtienen
          diseños, para siempre.
        </p>
      </div>
      <div className="mx-auto flex w-11/12 items-center justify-between pt-24">
        <div className="relative h-[20.22px] w-[88px] xl:h-[40.44px] xl:w-[196px]">
          <Image
            src={Logo}
            alt="Logo"
            fill
            sizes="(100vw - 2rem) 100vh"
            className="object-fill object-center"
          />
        </div>
        <div className="flex items-center gap-2 text-xs lg:gap-7 lg:text-base xl:gap-14">
          <Link href={"/"}>Planes</Link>
          <Link href={"/"}>Preguntas frecuentes</Link>
          <Link href={"/"}>Nuestro trabajo</Link>
          <Link href={"/"}>Política de Privacidad</Link>
          <Link href={"/"}>Términos y Condiciones</Link>
        </div>
      </div>
    </div>
  );
}
