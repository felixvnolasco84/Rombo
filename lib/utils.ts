import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import Altata from "@/public/images/Altata.jpg";
import Altata02 from "@/public/images/Altata02.png";

import TheNutHouse from "@/public/images/The_Nut_House_Post_Octubre-05.png";
import TheNutHouse02 from "@/public/images/The_Nut_House_Post_Octubre-07.png";

import Bupa from "@/public/images/Bupa.jpg";
import BupaHover from "@/public/images/Bupa__Hover.jpg";

import Odes from "@/public/images/Odes.png";
import OdesConstruction from "@/public/images/OdesConstruction.png";

import Entro from "@/public/images/Entro.jpg";
import Entro02 from "@/public/images/Entro02.jpg";

import BuenFINCAM from "@/public/images/Buen-FinCAMKIT.jpg";
import Guou from "@/public/images/Guou_01.png";

import Copa from "@/public/images/Copa.jpg";
import Copa02 from "@/public/images/Copa_02.jpg";

import Vim from "@/public/images/Vim.jpg";
import Vim02 from "@/public/images/Vim_02.png";

import Bold from "@/public/images/Bold01.jpg";
import Bold02 from "@/public/images/Bold02.jpg";

import Titan from "@/public/images/Titan_Post_Septiembre-01.png";
import Titan02 from "@/public/images/Titan_Post_Septiembre-07.png";
import { StaticImageData } from "next/image";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type HeroItem = {
  title: string;
  description: string;
  backgroundColor: string;
  image: any;
  link: string;
  buttonText?: string;
};

export type CarrouselCardProps = {
  image: StaticImageData;
  secondImage: StaticImageData;
  link: string;
};

export const carrouselItems: CarrouselCardProps[] = [
  {
    image: Altata,
    secondImage: Altata02,
    link: "",
  },
  {
    image: TheNutHouse,
    secondImage: TheNutHouse02,
    link: "",
  },
  {
    image: Bupa,
    secondImage: BupaHover,
    link: "",
  },
  {
    image: Odes,
    secondImage: OdesConstruction,
    link: "",
  },
  {
    image: Entro,
    secondImage: Entro02,
    link: "",
  },
  {
    image: BuenFINCAM,
    secondImage: Guou,
    link: "",
  },
  {
    image: Copa,
    secondImage: Copa02,
    link: "",
  },
  {
    image: Vim,
    secondImage: Vim02,
    link: "",
  },
  {
    image: Bold,
    secondImage: Bold02,
    link: "",
  },
  {
    image: Titan,
    secondImage: Titan02,
    link: "",
  },
];
