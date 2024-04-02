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
      className={` ${expand
        ? "hidden lg:block col-span-2"
        : "hidden lg:block col-span-1 aspect-square"
        } group  rounded-lg h-full ${item.backgroundColor} overflow-hidden`}
    >
      <div className={`relative flex flex-col justify-between shadow-lg lg:px-4 xl:px-5 lg:py-3 xl:py-6 h-full group-hover:${item.backgroundColorHover}`}>
        <div>
          <p className="lg:text-lg xl:text-xl">{item.description}</p>
          <Link
            className="top-4 right-4 absolute lg:w-[24px] xl:w-[32px] lg:h-[24px] xl:h-[32px]"
            href={item.link}
          >
            <Image
              fill
              sizes="(100vw - 2rem) 100vh"
              src={LinkIcon}
              alt={item.title}
              className="object-cover object-fit"
            />
          </Link>
        </div>

        <div className="flex flex-col items-center gap-8 xl:gap-16">
          <div className="relative lg:w-[68px] xl:w-[136px] lg:h-[54px] xl:h-[109px]">
            <Image
              fill
              sizes="(100vw - 2rem) 100vh"
              src={item.image}
              alt={item.title}
              className="object-cover object-fit"
            />
          </div>
          <h3 className="w-full text-3xl text-left xl:text-5xl">
            {item.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
