import Image from "next/image";
import CheckIcon from "@/public/svg/Check.svg";
import Smile from "@/public/svg/Smile.svg";

export default function Features() {
  return (
    <div className="rounded-xl bg-[#F2F2F2] pb-7 pt-10 lg:pb-14 lg:pt-20">
      <div className="mx-auto flex w-8/12 flex-col items-center lg:w-full">
        <h3 className="mb-10 text-center text-2xl md:text-2xl lg:mb-0 lg:text-left lg:text-3xl xl:text-4xl">
          Diseñamos una nueva manera de trabajar.
        </h3>
        <p className="mt-5 hidden text-xl lg:block lg:text-2xl xl:text-3xl">
          Tres simples pasos para comenzar.
        </p>

        <div className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-5 lg:p-12 xl:gap-10 xl:p-24">
          <div className="flex flex-grow flex-col items-center lg:w-1/3">
            <div className="relative h-[54px] w-[68px] lg:h-[54px] lg:w-[68px] xl:h-[108px] xl:w-[136px]">
              <Image
                src={CheckIcon}
                alt=""
                fill
                className="object-cover object-center"
              />
            </div>

            <p className="mt-5 text-center text-xs lg:text-left lg:text-lg xl:text-xl">
              Suscríbete a un plan y solicita tantos diseños como desees.
            </p>
          </div>
          <div className="flex flex-grow flex-col items-center lg:w-1/3">
            <div className="relative h-[54px] w-[68px] lg:h-[54px] lg:w-[68px] xl:h-[108px] xl:w-[136px]">
              <Image
                src={Smile}
                alt=""
                fill
                className="object-cover object-center"
              />
            </div>

            <p className="mt-5 text-center text-xs lg:text-left lg:text-lg xl:text-xl">
              Recibe tu diseño en 48 horas y sobre ese diseño solicita los
              ajustes necesarios.
            </p>
          </div>
          <div className="flex flex-grow flex-col items-center lg:w-1/3">
            <div className="relative h-[54px] w-[68px] lg:h-[54px] lg:w-[68px] xl:h-[108px] xl:w-[136px]">
              <Image
                src={Smile}
                alt=""
                fill
                className="object-cover object-center"
              />
            </div>

            <p className="mt-5 text-center text-xs lg:text-left lg:text-lg xl:text-xl">
              Revisaremos los diseños hasta que estés 100% satisfecho.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
