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
  return <RequestsDataTable columns={requestColumns} data={requests} />;
}
