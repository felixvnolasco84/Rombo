import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import Link from "next/link"
import RequestCard, { Request } from "../proyectos/components/RequestCard"


export default function page() {



  const request: Request[] = [
    {
      title: "Request Title",
      description: "Request Description",
      category: "Request Category",
      project: "Request Project",
      createdAt: "Request Created At",
      updatedAt: "Request Updated At"
    },

    {
      title: "Request Title",
      description: "Request Description",
      category: "Request Category",
      project: "Request Project",
      createdAt: "Request Created At",
      updatedAt: "Request Updated At"
    },

    {
      title: "Request Title",
      description: "Request Description",
      category: "Request Category",
      project: "Request Project",
      createdAt: "Request Created At",
      updatedAt: "Request Updated At"
    }

  ]

  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 p-4">
      {request.map((request, index) => (
        <RequestCard key={index} request={request} />
      ))}
    </div>
  )
}
