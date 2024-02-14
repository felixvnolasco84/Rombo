import Image from "next/image";
import LinkIcon from "@/public/svg/Link.svg";

import Link from "next/link";
import { HeroItem } from "@/lib/utils";

export default function HeroCard({
  item,
  expand,
}: {
  item: HeroItem;
  expand: boolean;
}) {
  return (
    <div
      key={item.title}
      className={` ${
        expand
          ? "hidden lg:block col-span-2"
          : "hidden lg:block col-span-1 aspect-square"
      }  rounded-lg h-full ${item.backgroundColor} overflow-hidden`}
    >
      <div className="relative flex h-full flex-col justify-between shadow-lg lg:px-4 lg:py-3 xl:px-5 xl:py-6">
        <div>
          <p className="lg:text-lg xl:text-xl">{item.description}</p>
          <Link
            className="absolute right-4 top-4 lg:h-[24px] lg:w-[24px] xl:h-[32px] xl:w-[32px]"
            href={item.link}
          >
            <Image
              fill
              sizes="(100vw - 2rem) 100vh"
              src={LinkIcon}
              alt={item.title}
              className="object-fit object-cover"
            />
          </Link>
        </div>

        <div className="flex flex-col items-center gap-8 xl:gap-16">
          <div className="relative lg:h-[54px] lg:w-[68px] xl:h-[109px] xl:w-[136px]">
            <Image
              fill
              sizes="(100vw - 2rem) 100vh"
              src={item.image}
              alt={item.title}
              className="object-fit object-cover"
            />
          </div>
          <h3 className="w-full text-left text-3xl xl:text-5xl">
            {item.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
