import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";1
import { GET as getAllBrands } from "@/app/api/brands/route";
import BrandCard from "../proyectos/components/BrandCard";

export default async function page() {
  const data = await getAllBrands();
  const brands = await data.json();

  return (
    <div>
      <div className="ml-auto flex items-center justify-end gap-2">
        <Button size="sm">
          <Link
            className="flex items-center gap-1"
            href="/portal/marcas/new"
          >
            <PlusCircle className="aspect-square w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Agregar Marca
            </span>
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2">
        {brands.map((project: any, index: any) => (
          <BrandCard key={index} project={project} />
        ))}
        {brands.length === 0 && (
          <div className="flex h-96 items-center justify-center">
            <p className="text-muted">No hay proyectos</p>
          </div>
        )}
      </div>
    </div>
  );
}
