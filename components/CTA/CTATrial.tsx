import { Button } from "../ui/button";

export default function CTATrial() {
  return (
    <div className="rounded-xl bg-[#C8FA70] px-4 pb-7 pt-10 lg:pb-14 lg:pt-20">
      <div className="mx-auto flex flex-col items-center">
        <h3 className="text-xl md:text-3xl lg:text-3xl xl:text-5xl">
          Free trial, 5 días de puro diseño.
        </h3>
        <p className="text-center text-xs lg:mt-3 lg:text-left lg:text-lg xl:mt-5 xl:text-2xl">
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
