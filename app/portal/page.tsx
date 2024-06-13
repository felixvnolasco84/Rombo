import { getAuthSession } from "@/utils/AuthOptions";
import RenderDocuments from "@/components/Forms/components/renderDocuments";
import { SimpleRequestDataTable } from "@/components/Tables/Requests/SimpleRequestDataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import KanBan from "@/components/Cards/KanbanList";
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

export default async function page() {
  const session: any = await getAuthSession();

  let brands: any = [];



  brands = await prisma.brand.findMany({
    where: {
      userEmail: session.user.email,
    },
    include: {
      user: true,
      requests: true,
      Board: {
        include: {
          lists: {
            include: {
              requests: {
                include: {
                  brand: true,
                  comments: true,
                },
                orderBy: {
                  order: "asc",
                },
              },
            },
            orderBy: {
              order: "asc",
            },
          },
        },
      },
    },
  });

    if (adminList.includes(session.user.email)) {
        brands = await prisma.brand.findMany({

          include: {
            user: true,
            requests: true,
            Board: {
              include: {
                lists: {
                  include: {
                    requests: {
                      include: {
                        brand: true,
                        comments: true,
                      },
                      orderBy: {
                        order: "asc",
                      },
                    },
                  },
                  orderBy: {
                    order: "asc",
                  },
                },
              },
            },
          },
        });
    }

  return (
    <>
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
        <Tabs defaultValue={brands[0].title} className="w-full">
          <TabsList>
            {brands.map((brand: any) => (
              <TabsTrigger key={brand.id} value={brand.title}>
                {brand.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <Separator className="my-4" />

          {brands.map((brand: any) => (
            <TabsContent key={brand.id} value={brand.title}>
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
                    <KanBan list={brand.Board[0].lists} />
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </>
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
