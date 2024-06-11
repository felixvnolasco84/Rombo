import { Button } from "../ui/button";
import Logo from "@/public/svg/Logo.svg";
import { getAuthSession } from "@/utils/AuthOptions";
import Image from "next/image";
import Link from "next/link";

export default async function FooterComponent() {
  const session: any = await getAuthSession();

  console.log(session);

  const email = session?.user?.email;

  console.log(email)

  

  return (
    <div className="flex flex-col items-center gap-12 bg-[#C8FA6F] py-12 text-[#121415] xl:gap-24">
      {!session && (
        <div className="flex flex-col items-center px-4">
          <h3 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            Descubre si rombo es para ti.
          </h3>
          <p className="text-center text-sm lg:text-lg xl:text-xl">
            Prueba un plan por 5 días ó habla con nosotros.
          </p>
          <div className="mt-6 flex flex-col justify-around gap-4 lg:flex-row lg:gap-6 xl:mt-12">
            <Button variant="secondary" size="md">
              Comenzar gratis
            </Button>
            <Button variant="secondary" size="md">
              Agenda una llamada
            </Button>
          </div>
          <p className="mt-3 w-full text-center text-xs lg:w-3/4 lg:text-sm xl:mt-6 xl:text-base">
            Descubre cómo tú y tu equipo pueden cambiar la forma en que obtienen
            diseños, para siempre.
          </p>
        </div>
      )}
      <div className="container flex w-full justify-between">
        <div className="relative h-[20.22px] w-[88px] xl:h-[40.44px] xl:w-[196px]">
          <Image
            src={Logo}
            alt="Logo"
            fill
            sizes="(100vw - 2rem) 100vh"
            className="object-fill object-center"
          />
        </div>
        <div className="grid w-full grid-cols-2 items-center gap-4 text-xs lg:w-3/4 lg:grid-cols-3 lg:text-base xl:grid-cols-4 2xl:grid-cols-5">
          <Link href={"/"}>Planes</Link>
          <Link href={"/"}>Preguntas frecuentes</Link>
          <Link href={"/"}>Nuestro trabajo</Link>
          <Link href={"/politicas-privacidad"}>Políticas de Privacidad</Link>
          <Link href={"/terminos-condiciones"}>Términos y Condiciones</Link>
        </div>
      </div>
    </div>
  );
}
