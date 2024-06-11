import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GET as getSingleBrand } from "@/app/api/brands/[id]/route";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import {
  BookOpenIcon,
  Factory,
  Globe,
  GlobeIcon,
  PlusCircle,
} from "lucide-react";
import { CalendarIcon, RefreshCwIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import TipTapOnlyContent from "@/components/TipTapOnlyContent";
import { requestColumnsNew } from "@/components/Tables/Requests/requestColumnsNew";
import RenderDocuments from "@/components/Forms/components/renderDocuments";
import DropdownMenuComponentBrand from "@/components/DropdownMenu/DropdownMenuComponentBrand";
import EditBrandImageDialog from "@/components/Dialogs/EditBrandImageDialog";
import { getAuthSession } from "@/utils/AuthOptions";
import { SimpleRequestDataTable } from "@/components/Tables/Requests/SimpleRequestDataTable";
import NotAutorizedComponent from "@/components/NotAutorizedComponent";
import KanBan from "@/components/Cards/KanBan";
import { adminList } from "@/lib/utils";

export default async function page({ params }: { params: { id: string } }) {
  const session: any = await getAuthSession();

  if (!session) {
    return <div>Not Authenticated!</div>;
  }

  const data = await getSingleBrand(params.id);
  const brand = await data.json();

  if (!brand) {
    return <div>Brand not found!</div>;
  }

  if (
    session.user.email !== brand.userEmail ||
    !adminList.includes(session.user.email) 
  ) {
    return <NotAutorizedComponent />;
  }
  
    return (
      <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-gray-100/40 p-4 dark:bg-gray-800/40 md:gap-8">
        <div className="ml-auto flex items-center justify-end gap-2">
          <Button size="sm">
            <Link
              className="flex items-center gap-1"
              href={`/portal/marcas/${brand.id}/new`}
            >
              <PlusCircle className="aspect-square w-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar Solicitud
              </span>
            </Link>
          </Button>
        </div>
        <div className="mx-auto flex w-full items-center gap-4">
          <EditBrandImageDialog brand={brand} />
          <div className="flex w-full flex-col gap-4">
            <div className="flex justify-between">
              <h1 className="text-3xl text-[#121415]">{brand.title}</h1>
              <DropdownMenuComponentBrand brand={brand} />
            </div>
            <TipTapOnlyContent content={brand.description} />
            <div className="flex gap-4">
              {brand.website && brand.website !== "" && (
                <div className="flex items-center gap-1 text-sm">
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
                <div className="flex items-center gap-1 text-sm">
                  <Factory className="h-4 w-4" />
                  <span className="text-gray-500 dark:text-gray-400">
                    {brand.industry}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <UserIcon className="h-4 w-4" />
                <span className="text-gray-500 dark:text-gray-400">
                  {brand.userEmail}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span className="text-gray-500 dark:text-gray-400">
                  {new Date(brand.createdAt).toLocaleDateString("es-MX", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <RefreshCwIcon className="h-4 w-4" />
                <span className="text-gray-500 dark:text-gray-400">
                  {new Date(brand.updatedAt).toLocaleDateString("es-Mx", {
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
              {brand.requests.length === 0 ? (
                <Link
                  className="w-full"
                  href={`/portal/marcas/${brand.id}/new`}
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
                  data={brand.requests}
                />
              )}
            </TabsContent>
            <TabsContent value="kanban">
              <KanBan list={brand.Board[0].lists} />
              {/* <Board initial={authorQuoteMap} /> */}
              {/* <Board initial={brand.Board[0].lists} /> */}
            </TabsContent>
          </Tabs>
          <Accordion
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
          </Accordion>
        </div>
      </div>
    );
}
