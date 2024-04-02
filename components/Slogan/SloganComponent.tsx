import People from "@/public/svg/People.svg";
import Image from "next/image";

export default function SloganComponent() {
  return (
    <div className="flex lg:flex-row flex-col-reverse justify-center items-center gap-4 lg:gap-8 bg-transparent mx-auto py-12 xl:py-24 w-10/12 lg:w-full">
      <h3 className="text-4xl text-center lg:text-left xl:text-5xl">
        Diseño ilimitado para todos.
      </h3>
      <div className="relative w-4/12 md:w-2/12 lg:w-1/12 aspect-square">
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
