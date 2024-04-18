
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { GET as getAllProjects } from "@/app/api/projects/route"
import ProjectCard from "./components/ProjectCard"
import Link from "next/link";


export default async function page() {

  const data = await getAllProjects()
  const projects = await data.json()

  console.log(projects);

  return (
    <div>
      <div className="ml-auto flex items-center justify-end gap-2">
        <Button size="sm">
          <Link className="flex items-center gap-1" href="/portal/proyectos/new">
            <PlusCircle className="aspect-square w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Agregar Proyecto
            </span>
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2">
        {projects.map((project: any, index: any) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>

  )
}
