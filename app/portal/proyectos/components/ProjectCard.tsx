
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { CalendarDaysIcon, CalendarIcon, RefreshCwIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export type Request = {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
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


export default function ProjectCard({ project }: { project: Project }) {
    return (
        <Card>
            <CardHeader className="pb-0">
                <CardTitle>
                    <Link className="hover:underline" href={`/portal/proyectos/${project.id}`}>
                        {project.title}
                    </Link>
                </CardTitle>
                <CardDescription>Created by {project.userEmail}</CardDescription>
            </CardHeader>
            <CardContent>
                {/* <Image
                    alt="Project 1"
                    className="w-full h-60 object-cover"
                    height={400}
                    src="/placeholder.svg"
                    style={{
                        aspectRatio: "600/400",
                        objectFit: "cover",
                    }}
                    width={600}
                /> */}
                <p className="mt-4">
                    {project.description}
                </p>
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span className="text-gray-500 dark:text-gray-400">Creado: {new Date(project.createdAt).toLocaleDateString('es-MX', {
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                        })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <RefreshCwIcon className="w-4 h-4" />
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
