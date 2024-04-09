import { GET as getAllProjects } from "@/app/api/projects/route"
import ProjectCard, { Project } from "./components/ProjectCard"


export default async function page() {

  const data = await getAllProjects()
  const projects = await data.json()


  console.log(projects)

  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 p-4">
      {projects.map((project: any, index: any) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  )
}
