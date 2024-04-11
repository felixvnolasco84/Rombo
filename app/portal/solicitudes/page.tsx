import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import Link from "next/link"

import RequestCard, { Request } from "../proyectos/components/RequestCard"
import { GET as getAllRequests } from "@/app/api/requests/route"

export default async function page() {

  const data = await getAllRequests();
  const requests = await data.json();

  console.log(requests)

  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 p-4">
      {requests.map((request: any, index: any) => (
        <RequestCard key={index} request={request} />
      ))}
      {
        requests.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>No Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                <Link href="/portal/solicitudes/create">
                  <p className="text-blue-500">Create a Request</p>
                </Link>
              </CardDescription>
            </CardContent>
          </Card>
        )
      }
    </div>
  )
}
