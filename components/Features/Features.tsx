import Image from "next/image";
import CheckIcon from "@/public/svg/Check.svg";
import Smile from "@/public/svg/Smile.svg";
import Next from "@/public/svg/Next.svg";

export default function Features() {
  return (
    <div className="bg-[#F2F2F2] pt-10 lg:pt-20 pb-7 lg:pb-14 rounded-xl">
      <div className="flex flex-col items-center mx-auto w-8/12 lg:w-full">
        <div className="flex flex-col justify-center items-center mx-auto w-1/2 text-[#121415] text-center">
          <h3 className="mb-10 lg:mb-0 text-2xl text-center md:text-2xl lg:text-5xl xl:text-6xl">
            Diseñamos una nueva manera de trabajar.
          </h3>
          <p className="lg:block hidden mt-5 text-xl lg:text-2xl xl:text-3xl">
            Tres simples pasos para comenzar.
          </p>

        </div>

        <div className="flex lg:flex-row flex-col justify-center items-baseline gap-10 lg:gap-5 xl:gap-10 lg:p-12 xl:p-24">
          <div className="flex flex-col flex-grow items-center lg:w-1/3">
            <div className="relative w-[68px] lg:w-[68px] xl:w-[136px] h-[54px] lg:h-[54px] xl:h-[108px]">
              <Image
                src={CheckIcon}
                alt=""
                fill
                className="object-center object-cover"
              />
            </div>

            <p className="mt-8 text-center text-xs lg:text-lg xl:text-xl">
              Suscríbete a un plan y solicita tantos diseños como desees.
            </p>
          </div>
          <div className="flex flex-col flex-grow items-center lg:w-1/3">
            <div className="relative w-[68px] lg:w-[68px] xl:w-[136px] h-[54px] lg:h-[54px] xl:h-[108px]">
              <Image
                src={Next}
                alt=""
                fill
                className="object-center object-cover"
              />
            </div>

            <p className="mt-8 text-center text-xs lg:text-lg xl:text-xl">
              Recibe tu diseño en 48 horas y sobre ese diseño solicita los
              ajustes necesarios.
            </p>
          </div>
          <div className="flex flex-col flex-grow items-center lg:w-1/3">
            <div className="relative w-[68px] lg:w-[68px] xl:w-[136px] h-[54px] lg:h-[54px] xl:h-[108px]">
              <Image
                src={Smile}
                alt=""
                fill
                className="object-center object-cover"
              />
            </div>

            <p className="mt-8 text-center text-xs lg:text-lg xl:text-xl">
              Revisaremos los diseños hasta que estés 100% satisfecho.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
