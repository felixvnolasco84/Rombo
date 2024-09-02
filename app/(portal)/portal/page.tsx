"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import RenderDocuments from "@/components/Forms/components/renderDocuments";
import { SimpleRequestDataTable } from "@/components/Tables/Requests/SimpleRequestDataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import KanBan from "@/components/Cards/KanbanList";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  Bell,
  Home,
  LucidePanelsTopLeft,
  Menu,
  PlusCircle,
  Users,
} from "lucide-react";
import KanBan from "@/components/Cards/KanBan";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import KanbanBoard from "@/components/Kanban/KanbanBoard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { requestColumnsNew } from "@/components/Tables/Requests/requestColumnsNew";
import { SimpleRequestDataTableHome } from "@/components/Tables/Requests/SimpleRequestDataTableHome";
import { Separator } from "@/components/ui/separator";
import { Id } from "@/convex/_generated/dataModel";
import Spinner from "@/components/spinner";

function RequestTable({ brandId }: { brandId: Id<"brand"> }) {
  const requests = useQuery(api.requests.getByBrand, {
    brandId: brandId,
  });

  if (requests === undefined) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (requests === null) {
    return (
      <Link className="w-full" href={`/portal/marcas/${brandId}/new`}>
        <Button
          variant="ghost"
          className="flex h-24 w-full items-center justify-center rounded-lg border border-gray-300"
        >
          No existen solicitudes
        </Button>
      </Link>
    );
  }

  return (
    <SimpleRequestDataTableHome columns={requestColumnsNew} data={requests} />
  );
}

function RequestsKanban({ brandId }: { brandId: Id<"brand"> }) {
  const requests = useQuery(api.requests.getByBrand, {
    brandId: brandId,
  });

  if (requests === undefined) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (requests === null) {
    return (
      <Link className="w-full" href={`/portal/marcas/${brandId}/new`}>
        <Button
          variant="ghost"
          className="flex h-24 w-full items-center justify-center rounded-lg border border-gray-300"
        >
          No existen solicitudes
        </Button>
      </Link>
    );
  }

  const lists = [
    {
      id: "TODO",
      title: "TO DO",
      requests: requests.filter((request) => request.status === "TO DO"),
    },
    {
      id: "IN PROGRESS",
      title: "IN PROGRESS",
      requests: requests.filter((request) => request.status === "IN PROGRESS"),
    },
    {
      id: "TEST",
      title: "TEST",
      requests: requests.filter((request) => request.status === "TEST"),
    },
    {
      id: "DONE",
      title: "DONE",
      requests: requests.filter((request) => request.status === "DONE"),
    },
  ];

  return <KanBan boardId={brandId} list={lists} />;
}

export default function Page() {
  const brands = useQuery(api.brands.getSidebar, {});

  if (brands === undefined) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (brands === null) {
    return <div>404</div>;
  }

  return (
    <div className="flex flex-col">
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
      <Link
        href={"/portal/marcas/new"}
        className="flex items-center justify-end pt-8"
      >
        <Button size={"sm"} variant={"default"}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Marca
        </Button>
      </Link>

      {brands.length === 0 ? (
        <Link className="" href="/portal/marcas/new">
          <Button
            variant="ghost"
            className="flex h-96 items-center justify-center rounded-lg border border-gray-300"
          >
            No hay marcas registradas
          </Button>
        </Link>
      ) : (
        <Tabs defaultValue={brands[0]._id}>
          <TabsList>
            {brands.map((brand) => (
              <TabsTrigger key={brand._id} value={brand.title}>
                {brand.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <Separator className="my-4" />

          {brands.map((brand) => (
            <TabsContent key={brand._id} value={brand.title}>
              <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl"></h3>
              <div className="mx-auto flex w-full flex-col gap-8">
                <Tabs defaultValue="table" className="w-full">
                  <TabsList>
                    <TabsTrigger value="table">
                      Tabla de Solicitudes
                    </TabsTrigger>
                    <TabsTrigger value="kanban">Tablero de Kanban</TabsTrigger>
                  </TabsList>
                  <TabsContent value="table">
                    <RequestTable brandId={brand._id} />
                  </TabsContent>
                  <TabsContent value="kanban">
                    <RequestsKanban brandId={brand._id} />
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}

{
  /* <Accordion
                defaultValue={brand.documents.length === 0 ? "" : "documents"}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value="documents">
                  <AccordionTrigger>
                    <h2 className="mb-4 text-2xl text-[#121415]">
                      Documentos Adjuntos
                    </h2>
                  </AccordionTrigger>
                  <AccordionContent>
                    {brand.documents && brand.documents.length > 0 ? (
                      <RenderDocuments documents={brand.documents} />
                    ) : (
                      <p className="text-sm text-gray-500">
                        No hay documentos adjuntos.
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion> */
}
