import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { CalendarIcon, RefreshCwIcon } from "lucide-react"
import Link from "next/link"


type Project = {
    id: string
    title: string
}

export type Request = {
    id: string
    title: string
    description: string
    category: string
    project: Project
    createdAt: string
    updatedAt: string
}

export default function RequestCard({ request }: { request: Request }) {

    console.log(request)
    return (
        <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-start gap-4">
                <div className="gap-1 grid">
                    <CardTitle>
                        <Link className="hover:underline" href={`/portal/solicitudes/${request.id}`}>
                            {request.title}
                        </Link>
                    </CardTitle>
                    {/* <CardDescription>{request.description}</CardDescription> */}
                </div>
                <div className="ml-auto text-gray-500 text-xs dark:text-gray-400">Categoria: {request.category}</div>
            </CardHeader>
            <CardContent className="gap-2 grid">
                <div className="flex items-center gap-1 font-semibold text-sm">
                    <span>Proyecto:</span>
                    <Link href={`/portal/proyectos/${request.project.id}`}>
                        <span className="hover:underline">{request.project.title}</span>
                    </Link>
                </div>

                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span className="text-gray-500 dark:text-gray-400">Creado el: {new Date(request.createdAt).toLocaleDateString("es-Mx", {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'

                        })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <RefreshCwIcon className="w-4 h-4" />
                        <span className="text-gray-500 dark:text-gray-400">Actualizado el: {new Date(request.updatedAt).toLocaleDateString("es-Mx", {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </div>
                </div>
            </CardContent>
        </Card >
    )
}
