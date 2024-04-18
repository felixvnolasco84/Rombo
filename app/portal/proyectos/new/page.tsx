import ProjectForm from "@/components/Forms/ProjectForm";

export default function page() {
    return (
        <div className="mx-auto max-w-6xl py-6">
            <h1 className="mb-4 w-11/12 text-center text-3xl lg:mb-3 lg:w-11/12 lg:text-left lg:text-4xl xl:mb-6 xl:text-6xl">Crea un nuevo proyecto</h1>
            <p className="mb-8 text-center text-xs lg:mb-3 lg:text-left lg:text-base xl:mb-6 xl:text-lg">Por favor llena el siguiente formulario para crear un nuevo proyecto.</p>
            {/* <ProjectForm /> */}
        </div>

    )
}
