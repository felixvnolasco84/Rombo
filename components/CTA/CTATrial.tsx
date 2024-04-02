import { Button } from "../ui/button";

export default function CTATrial() {
  return (
    <div className="bg-[#C8FA70] px-6 pt-10 lg:pt-20 pb-7 lg:pb-14 rounded-xl">
      <div className="flex flex-col items-center mx-auto">
        <h3 className="text-xl md:text-3xl lg:text-3xl xl:text-5xl">
          Free trial, 5 días de puro diseño.
        </h3>
        <p className="lg:mt-3 xl:mt-5 text-center text-xs lg:text-left lg:text-lg xl:text-2xl">
          ¡Elige tu plan, y comienza con nuestro servicio de diseño gratis
          durante 5 días!
        </p>
        <Button className="mt-5 xl:mt-9" variant={"secondary"} size={"xl"}>
          Comenzar gratis
        </Button>
      </div>
    </div>
  );
}
