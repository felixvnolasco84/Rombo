import RequestForm from "@/components/Forms/RequestForm";
import { Id } from "@/convex/_generated/dataModel";

export default function page({ params }: { params: { id: Id<"brand"> } }) {
  return (
    <div className="w-full py-6">
      <h1 className="mb-4 w-11/12 text-center text-3xl lg:mb-3 lg:w-11/12 lg:text-left lg:text-4xl xl:mb-6 xl:text-6xl">
        Nueva Solicitud
      </h1>
      <p className="mb-8 text-center text-xs lg:mb-3 lg:text-left lg:text-base xl:mb-6 xl:text-lg">
        Agrega una nueva solicitud a tu marca
      </p>
      <RequestForm brandId={params.id} />
    </div>
  );
}
