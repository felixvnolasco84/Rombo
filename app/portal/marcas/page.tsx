import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { GET as getAllBrands } from "@/app/api/brands/route";
import BrandCard from "../../../components/Cards/BrandCard";

export default async function page() {
  const data = await getAllBrands();
  const brands = await data.json();

  return (
    <div>
      <div className="ml-auto flex items-center justify-end gap-2">
        <Button size="sm">
          <Link className="flex items-center gap-1" href="/portal/marcas/new">
            <PlusCircle className="aspect-square w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Agregar Marca
            </span>
          </Link>
        </Button>
      </div>
      <div className="flex flex-col items-center p-4">
        {brands.length > 0 ? (
          brands.map((project: any, index: any) => (
            <BrandCard key={index} project={project} />
          ))
        ) : (
          <Link className="w-full" href="/portal/marcas/new">
            <Button
              variant="ghost"
              className="flex h-96 w-full items-center justify-center rounded-lg border border-gray-300"
            >
              No hay marcas registradas
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
