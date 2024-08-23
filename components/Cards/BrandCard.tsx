import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";
import { CalendarIcon, RefreshCwIcon } from "lucide-react";
import Link from "next/link";

export type Request = {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  category: string;
  brand: Project;
  attachments: string;
  updatedAt: string;
  brandId: string;
  userId: string;
};

export type Project = {
  _creationTime: number;
  updatedAt: number;
  _id: string;
  description: string;
  industry: string;
  isArchived: boolean;
  isPublished: boolean;
  requests: any;
  title: string;
  userId: string;
  website: string;
};

export default function BrandCard({ brand }: { brand: Doc<"brand"> }) {
  return (
    <Link href={`/portal/marcas/${brand._id}`}>
      <Card className="group">
        <CardHeader>
          <CardTitle className="group-hover:underline">{brand.title}</CardTitle>
          {/* <CardDescription>Created by {brand.userId}</CardDescription> */}
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span className="text-gray-500 dark:text-gray-400">
                Creado:{" "}
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
                Actualizado:{" "}
                {brand.updatedAt &&
                  new Date(brand.updatedAt).toLocaleDateString("es-MX", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
