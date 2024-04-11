
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { BookOpenIcon, CalendarIcon, RefreshCwIcon, UserIcon } from 'lucide-react'
import Image from 'next/image'
import { GET as getSingleProject } from '@/app/api/projects/[id]/route'
import { Project } from '../components/ProjectCard'
import Link from "next/link";
import RequestCardProject from "../components/RequestCardProject";

export default async function page({ params }: { params: { id: string } }) {

  const data = await getSingleProject(params.id)
  const project: Project = await data.json()

  return (
    <div className="flex flex-col flex-1 gap-4 md:gap-8 bg-gray-100/40 dark:bg-gray-800/40 p-4 min-h-[calc(100vh_-_theme(spacing.16))]">
      <div className="flex justify-end items-center gap-2 ml-auto">
        <Button size="sm">
          <Link className="flex items-center gap-1" href={`/portal/proyectos/${project.id}/new`}>
            <PlusCircle className="w-4 aspect-square" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Agregar Solicitud
            </span>
          </Link>
        </Button>
      </div>
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
        <h2 className="mb-4 font-bold text-2xl">Solicitudes</h2>

        {
          project.Request.length === 0 ? (
            <div className="flex flex-col items-center gap-4">
              <BookOpenIcon className="w-12 h-12" />
              <h3 className="font-bold text-xl">No requests yet</h3>
            </div>
          ) :
            (
              <div className="gap-6 grid md:grid-cols-2">
                {
                  project.Request.map((request, index) => (
                    <RequestCardProject key={index} request={request} />
                  ))
                }
              </div>

            )
        }
      </div>
    </div>
  )
}
