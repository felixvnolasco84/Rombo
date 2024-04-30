import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import Link from "next/link";

import RequestCard from "../proyectos/components/RequestCard";
import { GET as getAllRequests } from "@/app/api/requests/route";

export default async function page() {
  const data = await getAllRequests();
  const requests = await data.json();

  if (requests.message === "Not Authenticated!") {
    return (
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 p-4">
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

  if (requests === null || requests.length === 0) {
    return (
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 p-4">
        <Card>
          <CardHeader>
            <CardTitle>No Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <Link href="/portal/solicitudes/new">
                <p className="text-blue-500">Create a Request</p>
              </Link>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 p-4">
      {requests.map((request: any, index: any) => (
        <RequestCard key={index} request={request} />
      ))}
    </div>
  );
}
