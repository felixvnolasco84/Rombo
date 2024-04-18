
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { CalendarIcon, RefreshCwIcon } from "lucide-react";
import Link from "next/link";


export type Request = {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    category: string;
    project: Project;
    attachments: string;
    updatedAt: string;
    projectId: string;
    userId: string;
}

export type Project = {
    id: string
    title: string;
    userEmail: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    image: string;
    Request: Request[]
}


export default function BrandCard({ project }: { project: Project }) {
    return (
        <Card>
            <CardHeader className="">
                <CardTitle>
                    <Link className="hover:underline" href={`/portal/marcas/${project.id}`}>
                        {project.title}
                    </Link>
                </CardTitle>
                <CardDescription>Created by {project.userEmail}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span className="text-gray-500 dark:text-gray-400">Creado: {new Date(project.createdAt).toLocaleDateString('es-MX', {
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                        })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <RefreshCwIcon className="h-4 w-4" />
                        <span className="text-gray-500 dark:text-gray-400">Actualizado: {new Date(project.updatedAt).toLocaleDateString('es-MX', {
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                        })}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
