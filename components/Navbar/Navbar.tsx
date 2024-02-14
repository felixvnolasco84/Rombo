import Image from "next/image";
import Logo from "@/public/svg/Logo.svg";
import Link from "next/link";
import { Button } from "../ui/button";

type NavbarItem = {
  title: string;
  link: string;
};

const navbarItems: NavbarItem[] = [
  {
    title: "Agenda una Llamada",
    link: "#",
  },
  {
    title: "Nuestro Trabajo",
    link: "#",
  },
  {
    title: "FAQS",
    link: "#",
  },
  {
    title: "Planes",
    link: "#",
  },
];

export default function Navbar() {
  return (
    <div className="flex justify-between py-6">
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
      <div className="hidden items-center gap-9 lg:flex">
        {navbarItems.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="text-lg font-medium tracking-tighter"
          >
            {item.title}
          </Link>
        ))}
        <Button className="font-semibold" variant={"secondary"} size={"lg"}>
          Login
        </Button>
      </div>
    </div>
  );
}
