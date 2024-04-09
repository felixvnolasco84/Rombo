
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { GET as getAllProjects } from "@/app/api/projects/route"
import ProjectCard from "./components/ProjectCard"
import Link from "next/link";


export default async function page() {

  const data = await getAllProjects()
  const projects = await data.json()

  return (
    <div>
      <div className="flex justify-end items-center gap-2 ml-auto">
        <Button size="sm">
          <Link className="flex items-center gap-1" href="/portal/proyectos/new">
            <PlusCircle className="w-4 aspect-square" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Agregar Proyecto
            </span>
          </Link>
        </Button>
      </div>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 p-4">
        {projects.map((project: any, index: any) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>

  )
}
