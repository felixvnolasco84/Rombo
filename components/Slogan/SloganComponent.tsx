import Smile from "@/public/svg/Alien.svg";
import Image from "next/image";

export default function SloganComponent() {
  return (
    <div className="flex aspect-square flex-col-reverse items-center justify-center gap-4 bg-transparent lg:aspect-auto lg:flex-row lg:gap-8">
      <h3 className="text-center text-3xl lg:text-left xl:text-4xl">
        Diseño ilimitado para todos.
      </h3>
      <div className="relative h-[54px] w-[68px] xl:h-[108px] xl:w-[136px]">
        <Image
          src={Smile}
          alt=""
          fill
          className="object-cover object-center"
          sizes="(100vw - 2rem) 100vh"
        />
      </div>
    </div>
  );
}
