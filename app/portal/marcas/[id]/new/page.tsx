import ProjectForm from "@/components/Forms/ProjectForm";

export default function page({ params }: { params: { id: string } }) {
  return (
    <div className="w-full py-6">
      <h1 className="mb-4 w-11/12 text-center text-3xl lg:mb-3 lg:w-11/12 lg:text-left lg:text-4xl xl:mb-6 xl:text-6xl">
        Nueva Proyecto
      </h1>
      <p className="mb-8 text-center text-xs lg:mb-3 lg:text-left lg:text-base xl:mb-6 xl:text-lg">
        Agrega un nuevo proyecto a tu Marca
      </p>
      <ProjectForm  brandId={params.id} />
    </div>
  );
}
