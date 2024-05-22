import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import Link from "next/link";

import { GET as getAllRequests } from "@/app/api/requests/route";
import { RequestsDataTable } from "@/components/Tables/Requests/RequestsDataTable";
import { requestColumns } from "@/components/Tables/Requests/requestColumns";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default async function page() {
  const data = await getAllRequests();
  const requests = await data.json();

  if (requests.message === "Not Authenticated!") {
    return (
      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Not Authenticated!</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {/* add callback */}
              <Link href="/login">
                <p className="text-blue-500">Login</p>
              </Link>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <>
      <div className="ml-auto flex items-center gap-2">
        <Button size="sm">
          <Link
            className="flex items-center gap-1"
            href="/portal/solicitudes/new"
          >
            <PlusCircle className="aspect-square w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Agregar Solicitud
            </span>
          </Link>
        </Button>
      </div>
      <RequestsDataTable columns={requestColumns} data={requests} />
    </>
  );
}
