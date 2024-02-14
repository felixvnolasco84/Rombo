import Image from "next/image";
import LinkIcon from "@/public/svg/Link.svg";

import Link from "next/link";
import { HeroItem } from "@/lib/utils";

export default function HeroCardImage({
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
        expand ? "col-span-2 w-1/2" : "col-span-1 aspect-square"
      }  rounded-lg h-full ${item.backgroundColor}`}
    >
      <div className="relative flex h-full flex-col justify-between px-9 py-6 shadow-lg">
        <Image
          fill
          sizes="(100vw - 2rem) 100vh"
          src={LinkIcon}
          alt={item.title}
          className="object-fit object-cover"
        />
      </div>
    </div>
  );
}
