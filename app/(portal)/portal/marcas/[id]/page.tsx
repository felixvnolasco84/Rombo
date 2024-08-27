"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Factory, GlobeIcon, PlusCircle, RefreshCwIcon } from "lucide-react";
import { CalendarIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import TipTapOnlyContent from "@/components/TipTapOnlyContent";
import { requestColumnsNew } from "@/components/Tables/Requests/requestColumnsNew";
import { useQuery } from "convex/react";
import DropdownMenuComponentBrand from "@/components/DropdownMenu/DropdownMenuComponentBrand";
import EditBrandImageDialog from "@/components/Dialogs/EditBrandImageDialog";
import { SimpleRequestDataTable } from "@/components/Tables/Requests/SimpleRequestDataTable";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import TipTapEditor from "@/components/TipTap";
import KanBan from "@/components/Cards/KanBan";
import Spinner from "@/components/spinner";
import ActivitySheet from "@/components/ActivitySheet";

export default function Page({ params }: { params: { id: Id<"brand"> } }) {

  
  const requests = useQuery(api.requests.getByBrand, {
    brandId: params.id,
  });

  const brand = useQuery(api.brands.getById, {
    brandId: params.id,
  });

  if (brand === undefined) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (brand === null) {
    return <div>404</div>;
  }

  if (requests === undefined) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (requests === null) {
    return <div>404</div>;
  }

  const requestGroupByStatus: { [key: string]: any[] } = requests.reduce(
    (acc, request) => {
      if (request.status !== undefined) {
        if (!acc[request.status]) {
          acc[request.status] = [];
        }
        acc[request.status].push(request);
      }
      return acc;
    },
    {} as { [key: string]: any[] }
  );

  const kanbanLists = Object.keys(requestGroupByStatus).map((status) => ({
    title: status,
    requests: requestGroupByStatus[status],
  }));

  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-y-8">
      <div className="flex items-center">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/portal">Portal</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/portal/marcas">Marcas</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{brand.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid gap-8">
        <div className="ml-auto flex items-center justify-end gap-2">
          <Button size="sm">
            <Link
              className="flex items-center gap-1"
              href={`/portal/marcas/${brand._id}/new`}
            >
              <PlusCircle className="aspect-square w-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar Solicitud
              </span>
            </Link>
          </Button>
          <ActivitySheet entityId={brand._id} />
        </div>
        <div className="mx-auto flex w-full items-center gap-4">
          <EditBrandImageDialog brand={brand} />
          <div className="flex w-full flex-col gap-4">
            <div className="flex justify-between">
              <h1 className="text-3xl text-[#121415]">{brand.title}</h1>
              <DropdownMenuComponentBrand brand={brand} />
            </div>
            <TipTapOnlyContent content={brand.description} />
            <div className="grid grid-cols-2 gap-2 text-sm">
              {brand.website && brand.website !== "" && (
                <div className="flex items-center gap-1">
                  <GlobeIcon className="h-4 w-4" />
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400"
                  >
                    {brand.website}
                  </a>
                </div>
              )}
              {brand.industry && brand.industry !== "" && (
                <div className="flex items-center gap-1">
                  <Factory className="h-4 w-4" />
                  <span className="text-gray-500 dark:text-gray-400">
                    {brand.industry}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <UserIcon className="h-4 w-4" />
                <span className="text-gray-500 dark:text-gray-400">
                  {brand.userId}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span className="text-gray-500 dark:text-gray-400">
                  {new Date(brand._creationTime).toLocaleDateString("es-MX", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <RefreshCwIcon className="h-4 w-4" />
                <span className="text-gray-500 dark:text-gray-400">
                  {brand.updatedAt &&
                    new Date(brand.updatedAt).toLocaleDateString("es-Mx", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-full flex-col gap-8">
          <Tabs defaultValue="table" className="w-full">
            <TabsList>
              <TabsTrigger value="table">Tabla de Solicitudes</TabsTrigger>
              <TabsTrigger value="kanban">Tablero de Kanban</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              {requests.length === 0 ? (
                <Link
                  className="w-full"
                  href={`/portal/marcas/${brand._id}/new`}
                >
                  <Button
                    variant="ghost"
                    className="flex h-24 w-full items-center justify-center rounded-lg border border-gray-300"
                  >
                    No existen solicitudes
                  </Button>
                </Link>
              ) : (
                <SimpleRequestDataTable
                  columns={requestColumnsNew}
                  data={requests}
                />
              )}
            </TabsContent>
            <TabsContent value="kanban">
              <KanBan list={kanbanLists} />
              {/* <Board initial={authorQuoteMap} /> */}
              {/* <Board initial={brand.Board[0].lists} /> */}
            </TabsContent>
          </Tabs>
          {/* <Accordion
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
        </Accordion> */}
        </div>
      </div>
    </div>
  );
}
