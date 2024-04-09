import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { CalendarDaysIcon, CalendarIcon, RefreshCwIcon } from "lucide-react"
import Link from "next/link"


export type Request = {
    title: string
    description: string
    category: string
    project: string
    createdAt: string
    updatedAt: string
}

export default function RequestCard({ request }: { request: Request }) {
    return (
        <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-start gap-4">
                <div className="gap-1 grid">
                    <CardTitle>
                        <Link className="hover:underline" href={`/portal/solicitudes/${request.title}`}>
                            {request.title}
                        </Link>
                    </CardTitle>
                    <CardDescription>{request.description}</CardDescription>
                </div>
                <div className="ml-auto text-gray-500 text-xs dark:text-gray-400">Category: {request.category}</div>
            </CardHeader>
            <CardContent className="gap-2 grid">
                <div className="font-semibold text-sm">Project: {request.project}</div>
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span className="text-gray-500 dark:text-gray-400">Created at: {request.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <RefreshCwIcon className="w-4 h-4" />
                        <span className="text-gray-500 dark:text-gray-400">Updated at: {request.updatedAt}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
