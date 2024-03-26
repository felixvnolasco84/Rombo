import People from "@/public/svg/People.svg";
import Image from "next/image";

export default function SloganComponent() {
  return (
    <div className="flex lg:flex-row flex-col-reverse justify-center items-center gap-4 lg:gap-8 bg-transparent aspect-square lg:aspect-auto">
      <h3 className="text-3xl text-center lg:text-left xl:text-4xl">
        Diseño ilimitado para todos.
      </h3>
      <div className="relative w-[68px] xl:w-[136px] h-[54px] xl:h-[108px]">
        <Image
          src={People}
          alt=""
          fill
          className="object-center object-cover"
          sizes="(100vw - 2rem) 100vh"
        />
      </div>
    </div>
  );
}
