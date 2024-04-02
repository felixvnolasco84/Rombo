import Image from "next/image";
import LinkIcon from "@/public/svg/Link.svg";

import Link from "next/link";
import { HeroItem } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function HeroCardHorizontal({
  item,
}: {
  item: HeroItem;
  expand: boolean;
}) { 
  return (
    <div
      key={item.title}
      className={`col-span-2 rounded-lg h-full ${item.backgroundColor}`}
    >
      <div className="relative flex justify-between items-center gap-4 xl:gap-[75px] shadow-md px-6 lg:px-4 xl:px-9 py-6 lg:py-6 xl:py-9 h-full">
        <div className="flex flex-col items-center gap-4 xl:gap-8">
          <div className="relative flex flex-col w-[68px] xl:w-[62px] h-[54px] xl:h-[100px]">
            <Image
              fill
              sizes="(100vw - 2rem) 100vh"
              src={item.image}
              alt={item.title}
              className="object-fill object-fit"
            />
          </div>
          <Button className="" variant={"primary"} size={"xl"}>
            <Link href={item.link}>{item.buttonText}</Link>
          </Button>
        </div>
        <div className="flex flex-col lg:gap-3 xl:gap-5">
          <h3 className="text-lg lg:text-2xl xl:text-3xl">{item.title}</h3>
          <p className="text-xs lg:text-base xl:text-xl">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
