// import { GET as getAllBrands } from "@/app/api/brands/route";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/utils/AuthOptions";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import BrandCard from "../../../components/Cards/BrandCard";
import prisma from "@/utils/ConnectionPool";
import { adminList } from "@/lib/utils";

export default async function page() {
  // const data = await getAllBrands();
  // const brands = await data.json();
  const session: any = await getAuthSession();

  let brands = [];

  if (adminList.includes(session.user.email)) {
    brands = await prisma.brand.findMany();
  } else {
    brands = await prisma.brand.findMany({
      where: {
        userEmail: session.user.email,
      },
    });
  }

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
      <div className="grid w-fit grid-cols-2 gap-4 p-4">
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
