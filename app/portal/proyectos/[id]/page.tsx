
import { BookOpenIcon, CalendarIcon, HomeIcon, LayoutPanelLeftIcon, RefreshCwIcon, UserIcon } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { GET as getSingleProject } from '@/app/api/projects/[id]/route'
import { Project } from '../components/ProjectCard'

export default async function page({ params }: { params: { id: string } }) {

  const data = await getSingleProject(params.id)

  const project: Project = await data.json()

  return (
    <main className="flex flex-col flex-1 gap-4 md:gap-8 bg-gray-100/40 dark:bg-gray-800/40 p-4 min-h-[calc(100vh_-_theme(spacing.16))]">
      <div className="flex items-center gap-4 mx-auto w-full max-w-6xl">
        <Image
          alt="Project Image"
          className="rounded-lg object-cover"
          height="300"
          src="/placeholder.svg"
          style={{
            aspectRatio: "300/300",
            objectFit: "cover",
          }}
          width="300"
        />
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl">{project.title}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {project.description}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <UserIcon className="w-4 h-4" />
              <span className="text-gray-500 dark:text-gray-400">{project.userEmail}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              <span className="text-gray-500 dark:text-gray-400">Creado el {new Date(project.createdAt).toLocaleDateString('es-MX', {
                month: "long",
                day: "numeric",
                year: "numeric"
              })}</span>
            </div>
            <div className="flex items-center gap-1">
              <RefreshCwIcon className="w-4 h-4" />
              <span className="text-gray-500 dark:text-gray-400">Última Actualización el {new Date(project.updatedAt).toLocaleDateString('es-Mx', {
                month: "long",
                day: "numeric",
                year: "numeric"
              })}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="font-bold text-2xl">Project Requests</h2>

        {
          project.Request.length === 0 ? (
            <div className="flex flex-col items-center gap-4">
              <BookOpenIcon className="w-12 h-12" />
              <h3 className="font-bold text-xl">No requests yet</h3>
            </div>
          ) :
            (
              <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
                {
                  project.Request.map((request, index) => (
                    <Card key={index}>
                      <CardHeader className="flex flex-row items-center gap-4">
                        <HomeIcon className="w-8 h-8" />
                        <div className="gap-1 grid">
                          <CardTitle>{request.title}</CardTitle>
                          <CardDescription>{request.description}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="gap-2 grid">
                        <div className="font-semibold text-sm">{request.userId}</div>
                      </CardContent>
                    </Card>
                  ))
                }
              </div>

            )
        }
      </div>
    </main>
  )
}
