import { GET as getSingleBrand } from "@/app/api/brands/[id]/route";
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
    session.user.email !==
    (brand.userEmail ||
      "felix@polygonag.com" ||
      "alba@polygonag.com" ||
      "rodrigo@polygonag.com")
  ) {
    return <div>Not Authorized!</div>;
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
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4">
        <EditBrandImageDialog brand={brand} />
        <div className="flex w-full flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">{brand.title}</h1>
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
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="mb-4 text-2xl font-bold">Solicitudes</h2>
        {brand.requests.length === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <BookOpenIcon className="h-12 w-12" />
            <h3 className="text-xl font-bold">Sin solicitudes</h3>
          </div>
        ) : (
          <SimpleRequestDataTable
            columns={requestColumnsNew}
            data={brand.requests}
          />
          // <div className="grid gap-6 md:grid-cols-2">
          //   {brand.requests.map((request: any, index: any) => (
          //     <RequestCard key={index} request={request} />
          //   ))}
          // </div>
        )}
        <h2 className="mb-4 text-2xl font-bold">Documentos Adjuntos</h2>
        <RenderDocuments documents={brand.documents} />
      </div>
    </div>
  );
}
