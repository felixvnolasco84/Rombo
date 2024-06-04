import { type ClassValue, clsx } from "clsx";
import pdfIcon from "@/public/svg/pdf-icon.svg";
import xlsIcon from "@/public/svg/xls-icon.svg";
import docxIcon from "@/public/svg/docx-icon.svg";
import imageIcon from "@/public/svg/image.svg";
import simpleDocument from "@/public/svg/simple-document.svg";

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
import { toast } from "@/components/ui/use-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type HeroItem = {
  title: string;
  description: string;
  backgroundColor: string;
  backgroundColorHover: string;
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

export const handleDeleteSinglePost = async (id: string, router: any) => {
  try {
    const repsonse = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    if (repsonse.status == 200) {
      toast({
        variant: "default",
        title: "¡Entendido!",
        description: "Se ha eliminado correctamente tu publicación 🎉",
      });
      router.push("/");
    } else
      toast({
        variant: "destructive",
        title: "¡Oh!",
        description: "Al parecer hubo un error, intentelo más tarde 🎉",
      });
  } catch (error) {
    console.log(error);
  }
};

export default function getFileIcon(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "pdf":
      return pdfIcon;
    case "doc":
    case "docx":
      return docxIcon;
    case "ppt":
    case "pptx":
      return pdfIcon;
    case "xls":
    case "csv":
    case "xlsx":
      return xlsIcon;
    case "jpg":
    case "jpeg":
    case "png":
      return imageIcon;
    default:
      return simpleDocument;
  }
}

export type DocumentUpload = {
  name: string;
  url: string;
};

export const industries = [
  "Agricultura",
  "Arquitectura",
  "Arte y Entretenimiento",
  "Automotriz",
  "Bienes Raíces",
  "Comercio",
  "Comunicación",
  "Construcción",
  "Consultoría",
  "Diseño",
  "Educación",
  "Energía",
  "Finanzas",
  "Gastronomía",
  "Gobierno",
  "Industria",
  "Ingeniería",
  "Inmobiliaria",
  "Legal",
  "Manufactura",
  "Medicina",
  "Publicidad",
  "Recursos Humanos",
  "Salud",
  "Seguros",
  "Servicios",
  "Tecnología",
  "Telecomunicaciones",
  "Transporte",
  "Turismo",
  "Ventas",
];

export type Notification = {
  id: String;
  message: String;
  type: String;
  brandId?: String;
  requestId?: String;
  commentId?: String;
  read: Boolean;
  userId: String;
};

export const services = [
  {
    id: 1,
    name: "Gráficos de Redes Sociales",
  },
  {
    id: 2,
    name: "Papelería, Infografías, Folletos",
  },
  {
    id: 3,
    name: "Fotos de Stock Ilimitadas",
  },
  {
    id: 4,
    name: "Presentaciones",
  },
  {
    id: 5,
    name: "Reels y Motion Graphics",
  },
  {
    id: 6,
    name: "Branding & Logotipos",
  },
];

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "low":
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-red-100 text-red-800";
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "todo":
      return "bg-green-200";
    case "in progress":
      return "bg-yellow-200";
    default:
      return "bg-red-200";
  }
}

export const features = [
  {
    title: "Gráficos de Redes Sociales",
    included: true,
  },
  {
    title: "Papelería, Infografías, Folletos",
    included: true,
  },
  {
    title: "Fotos de Stock Ilimitadas",
    included: true,
  },
  {
    title: "Papelería, Infografías, Folletos",
    included: true,
  },
  {
    title: "Presentaciones",
    included: true,
  },
  {
    title: "Fotos de Stock Ilimitadas",
    included: false,
  },
  {
    title: "Reels y Motion Graphics",
    included: false,
  },
  {
    title: "Branding & Logotipos",
    included: false,
  },
  {
    title: "Ilustraciones",
    included: false,
  },
  {
    title: "Páginas Web",
    included: false,
  },
];


// @ts-ignore
import mexStrings from "react-timeago/lib/language-strings/es";
// @ts-ignore
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

export const formatter = buildFormatter(mexStrings);