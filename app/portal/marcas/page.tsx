"use client";

import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getAuthSession } from "@/utils/AuthOptions";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import BrandCard from "../../../components/Cards/BrandCard";
import prisma from "@/utils/ConnectionPool";
import { adminList } from "@/lib/utils";

export default function Page() {
  // const data = await getAllBrands();
  // const brands = await data.json();
  // const session: any = await getAuthSession();

  // let brands = [];

  // if (adminList.includes(session.user.email)) {
  //   brands = await prisma.brand.findMany();
  // } else {
  //   brands = await prisma.brand.findMany({
  //     where: {
  //       userEmail: session.user.email,
  //     },
  //   });
  // }

  const brands = useQuery(api.brands.getSidebar, {});

  if (brands === undefined) {
    return <div>cargando...</div>;
  }

  if (brands === null) {
    return <div>404</div>;
  }

  return (
    <div className="grid gap-8 p-8">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#">Portal</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#">Marcas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex items-center justify-end gap-2">
        <Button size="sm">
          <Link className="flex items-center gap-1" href="/portal/marcas/new">
            <PlusCircle className="aspect-square w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Agregar Marca
            </span>
          </Link>
        </Button>
      </div>
      <div className="w-full">
        {brands.length > 0 ? (
          <div className="grid w-fit grid-cols-2 gap-4">
            {brands.map((project: any, index: any) => (
              <BrandCard key={index} project={project} />
            ))}
          </div>
        ) : (
          <Link className="w-full" href="/portal/marcas/new">
            <Button
              variant="ghost"
              className="flex h-96 w-full items-center justify-center rounded-lg border border-gray-300"
            >
              No hay marcas registradas
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
