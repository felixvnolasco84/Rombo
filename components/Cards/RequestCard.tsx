import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import prisma from "@/utils/ConnectionPool";
import { CalendarIcon, RefreshCwIcon } from "lucide-react";
import Link from "next/link";

type Brand = {
  id: string;
  title: string;
};

export type Request = {
  id: string;
  title: string;
  description: string;
  category: string;
  brand: Brand;
  createdAt: string;
  updatedAt: string;
};

export default async function RequestCard({ request }: { request: Request }) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="grid gap-1">
          <CardTitle>
            <Link
              className="hover:underline"
              href={`/portal/solicitudes/${request.id}`}
            >
              {request.title}
            </Link>
          </CardTitle>
          {/* <CardDescription>{request.description}</CardDescription> */}
        </div>
        <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">
          Categoria: {request.category}
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex items-center gap-1 text-sm font-semibold">
          {/* <span>Marca:</span>
          <Link href={`/portal/proyectos/${request.brand.id}`}>
            <span className="hover:underline">{request.brand.title}</span>
          </Link> */}
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span className="text-gray-500 dark:text-gray-400">
              Creado el:{" "}
              {new Date(request.createdAt).toLocaleDateString("es-Mx", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <RefreshCwIcon className="h-4 w-4" />
            <span className="text-gray-500 dark:text-gray-400">
              Actualizado el:{" "}
              {new Date(request.updatedAt).toLocaleDateString("es-Mx", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
