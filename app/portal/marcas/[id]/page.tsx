import { GET as getSingleBrand } from "@/app/api/brands/[id]/route";
import { Button } from "@/components/ui/button";
import { BookOpenIcon, PlusCircle } from "lucide-react";
import { CalendarIcon, RefreshCwIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProjectCard from "../../proyectos/components/ProjectCard";
import TipTapOnlyContent from "@/components/TipTapOnlyContent";
import DropdownMenuComponent from "@/components/DropdownMenu/DropdownMenuComponent";

export default async function page({ params }: { params: { id: string } }) {
  const data = await getSingleBrand(params.id);
  const brand = await data.json();

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
              Agregar Proyecto
            </span>
          </Link>
        </Button>
      </div>
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4">
        <Image
          alt="Project Image"
          className="rounded-lg object-cover"
          height="300"
          src="/placeholder.svg"
          style={{
            aspectRatio: "300/300",
            objectFit: "cover",
          }}
          width="300"
        />
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">{brand.title}</h1>
            <DropdownMenuComponent editPath={`/portal/marcas/${brand.id}/editar`} deleteId={brand.id}/>
          </div>
          <TipTapOnlyContent content={brand.description} />
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
                Creado el{" "}
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
                Última Actualización el{" "}
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
        <h2 className="mb-4 text-2xl font-bold">Proyectos</h2>

        {brand.project.length === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <BookOpenIcon className="h-12 w-12" />
            <h3 className="text-xl font-bold">Sin Proyectos</h3>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {brand.project.map((project: any, index: any) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
