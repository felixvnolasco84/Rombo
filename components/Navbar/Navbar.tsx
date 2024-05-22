import Image from "next/image";
import Logo from "@/public/svg/Logo.svg";
import Link from "next/link";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import AuthSection from "./AuthSection";
import { getAuthSession } from "@/utils/AuthOptions";

type NavbarItem = {
  title: string;
  link: string;
};

const navbarItems: NavbarItem[] = [
  {
    title: "Agenda una Llamada",
    link: "https://api.whatsapp.com/send?phone=5215545009532&text=Hola!%20Me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20Rombo!",
  },
  {
    title: "Nuestro Trabajo",
    link: "/#nuestro-trabajo",
  },
  {
    title: "FAQS",
    link: "/#faqs",
  },
  {
    title: "Planes",
    link: "/#planes",
  },
];

export default async function Navbar() {
  const session: any = await getAuthSession();

  return (
    <div className="sticky top-0 z-50 mt-2 flex justify-between rounded-2xl bg-muted/40 px-4 py-6 shadow-sm">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="block h-6 w-6 lg:hidden" />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>
                <Link
                  href={"/"}
                  className="relative h-[16.11px] w-[102.66px] xl:h-[40.44px] xl:w-[196px]"
                >
                  <SheetClose className="text-white">
                    <Image
                      src={Logo}
                      alt="Logo"
                      fill
                      sizes="(100vw - 2rem) 100vh"
                      className="object-fill object-center"
                    />
                  </SheetClose>
                </Link>
              </SheetTitle>
              <SheetDescription className="flex flex-col gap-4 text-black">
                {navbarItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    className="text-lg font-medium tracking-tighter"
                  >
                    <SheetClose> {item.title}</SheetClose>
                  </Link>
                ))}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Link
          href={"/"}
          className="relative h-[16.11px] w-[102.66px] xl:h-[40.44px] xl:w-[196px]"
        >
          <Image
            src={Logo}
            alt="Logo"
            fill
            sizes="(100vw - 2rem) 100vh"
            className="object-fill object-center"
          />
        </Link>
      </div>

      <div className="hidden items-center gap-9 lg:flex">
        {!session &&
          navbarItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="text-lg font-medium tracking-tighter"
            >
              {item.title}
            </Link>
          ))}
        <AuthSection />
      </div>
    </div>
  );
}
