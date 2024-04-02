import { Button } from "../ui/button";
import Logo from "@/public/svg/Logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function FooterComponent() {
  return (
    <div className="bg-[#C8FA6F] py-12 text-[#121415]">
      <div className="mx-auto w-10/12 md:w-1/2 2xl:w-1/3">
        <h3 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          Descubre si rombo es para ti.
        </h3>
        <p className="text-center text-sm lg:text-lg xl:text-xl">
          Prueba un plan por 5 días ó habla con nosotros.
        </p>

        <div className="flex lg:flex-row flex-col justify-around gap-4 lg:gap-0 mt-6 xl:mt-12">
          <Button className="mr-4" variant="secondary" size="lg">
            Comenzar gratis
          </Button>
          <Button className="mr-4" variant="secondary" size="lg">
            Agenda una llamada
          </Button>
        </div>
        <p className="mx-auto mt-3 xl:mt-6 w-full lg:w-3/4 text-center text-xs lg:text-sm xl:text-base">
          Descubre cómo tú y tu equipo pueden cambiar la forma en que obtienen
          diseños, para siempre.
        </p>
      </div>
      <div className="flex md:flex-row flex-col justify-between items-center gap-4 md:gap-0 mx-auto pt-24 w-11/12">
        <div className="relative w-[88px] xl:w-[196px] h-[20.22px] xl:h-[40.44px]">
          <Image
            src={Logo}
            alt="Logo"
            fill
            sizes="(100vw - 2rem) 100vh"
            className="object-center object-fill"
          />
        </div>
        <div className="items-center gap-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 text-xs lg:text-base">
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
