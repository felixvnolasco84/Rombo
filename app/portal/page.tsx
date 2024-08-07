"use client";

import { getAuthSession } from "@/utils/AuthOptions";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import RenderDocuments from "@/components/Forms/components/renderDocuments";
import { SimpleRequestDataTable } from "@/components/Tables/Requests/SimpleRequestDataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import KanBan from "@/components/Cards/KanbanList";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Bell,
  Home,
  LucidePanelsTopLeft,
  Menu,
  PlusCircle,
  Users,
} from "lucide-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import prisma from "@/utils/ConnectionPool";
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
import { adminList } from "@/lib/utils";
import { requestColumnsNew } from "@/components/Tables/Requests/requestColumnsNew";
import { SimpleRequestDataTableHome } from "@/components/Tables/Requests/SimpleRequestDataTableHome";
import { Separator } from "@/components/ui/separator";
import { useOrganization } from "@clerk/clerk-react";
import { SidebarNavDashboard } from "./components/sidebar-nav-dashboard";

export default function Page() {
  const create = useMutation(api.brands.create);

  const handleBrandCreate = () => {
    const promise = create({
      title: "Untitled",
      description: "Description",
      industry: "Industry",
      website: "https://example.com",
      // orgid: organization.id,
    });
    // .then((documentId) => documentModal.onOpen(documentId));

    toast.promise(promise, {
      loading: "Creating a new Brand...",
      success: "Brand created successfully.",
      error: "Failed to create a new Brand.",
    });
  };
  // const session: any = await getAuthSession();

  // let brands: any = [];

  // brands = await prisma.brand.findMany({
  //   where: {
  //     userEmail: session.user.email,
  //   },
  //   include: {
  //     user: true,
  //     requests: true,
  //     Board: {
  //       include: {
  //         lists: {
  //           include: {
  //             requests: {
  //               include: {
  //                 brand: true,
  //                 comments: true,
  //               },
  //               orderBy: {
  //                 order: "asc",
  //               },
  //             },
  //           },
  //           orderBy: {
  //             order: "asc",
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  // if (adminList.includes(session.user.email)) {
  //     brands = await prisma.brand.findMany({

  //       include: {
  //         user: true,
  //         requests: true,
  //         Board: {
  //           include: {
  //             lists: {
  //               include: {
  //                 requests: {
  //                   include: {
  //                     brand: true,
  //                     comments: true,
  //                   },
  //                   orderBy: {
  //                     order: "asc",
  //                   },
  //                 },
  //               },
  //               orderBy: {
  //                 order: "asc",
  //               },
  //             },
  //           },
  //         },
  //       },
  //     });
  // }

  // const { organization } = useOrganization();

  const brands = useQuery(api.brands.getSidebar, {});

  if (brands === undefined) {
    return <div>cargando...</div>;
  }

  if (brands === null) {
    return <div>404</div>;
  }

  return (
    <div className="flex flex-col px-4">
      <Link
        href={"/portal/marcas/new"}
        className="flex items-center justify-end pt-8"
      >
        <Button
          size={"sm"}
          variant={"default"}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Marca
        </Button>
      </Link>

      {brands.length === 0 ? (
        <Link className="w-full" href="/portal/marcas/new">
          <Button
            variant="ghost"
            className="flex h-96 w-full items-center justify-center rounded-lg border border-gray-300"
          >
            No hay marcas registradas
          </Button>
        </Link>
      ) : (
        <Tabs defaultValue={brands[0]._id} className="w-full">
          <TabsList>
            {brands.map((brand: any) => (
              <TabsTrigger key={brand.id} value={brand.title}>
                {brand.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <Separator className="my-4" />

          {brands.map((brand: any) => (
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
                      <SimpleRequestDataTableHome
                        columns={requestColumnsNew}
                        data={brand.requests}
                      />
                    )}
                  </TabsContent>
                  <TabsContent value="kanban">
                    {/* <KanBan
                      boardId={brand.Board[0].id}
                      list={brand.Board[0].lists}
                    /> */}
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
