"use client";

import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { RequestsDataTable } from "@/components/Tables/Requests/RequestsDataTable";
import { requestColumns } from "@/components/Tables/Requests/requestColumns";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Page() {
  const requests = useQuery(api.requests.getSidebar, {});

  if (requests === undefined) {
    return <></>;
  }

  return (
    <div className="grid gap-8">
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

      <div className="ml-auto flex items-center gap-2">
        <Button size="sm">
          <Link
            className="flex items-center gap-1"
            href="/portal/solicitudes/new"
          >
            <PlusCircle className="aspect-square w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Agregar Solicitud
            </span>
          </Link>
        </Button>
      </div>
      <RequestsDataTable columns={requestColumns} data={requests} />
    </div>
  );
}
