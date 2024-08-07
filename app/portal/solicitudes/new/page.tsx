"use client";

import RequestFormWithoutReference from "@/components/Forms/RequestFormWithoutReference";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";

export default function Page() {
  const brands = useQuery(api.brands.getSidebar, {});

  if (brands === undefined) {
    return <></>;
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 p-8">
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
              <Link href="#">Solicitudes</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid gap-2">
        <h1 className="w-11/12 text-center text-3xl lg:w-11/12 lg:text-left lg:text-4xl xl:text-6xl">
          Nueva Solicitud
        </h1>
        <p className="text-center text-xs lg:text-left lg:text-base xl:text-lg">
          Agrega una nueva solicitud a una marca
        </p>
      </div>

      <RequestFormWithoutReference brands={brands} />
    </div>
  );
}
