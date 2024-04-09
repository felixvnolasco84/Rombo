import RequestForm from "@/components/Forms/RequestForm";

export default function page({ params }: { params: { id: string } }) {
    return (
        <div className="mx-auto py-6 max-w-6xl">
            <h1 className="mb-4 lg:mb-3 xl:mb-6 w-11/12 lg:w-11/12 text-3xl text-center lg:text-left lg:text-4xl xl:text-6xl"> Solicita tu nuevo diseño</h1>
            <p className="mb-8 lg:mb-3 xl:mb-6 text-center text-xs lg:text-left lg:text-base xl:text-lg">Por favor llena el siguiente formulario con las especificaciones de tu diseño para que podamos
                programar tu solicitud cuanto antes.</p>
            <RequestForm projectId={params.id} />
        </div>

    )
}
