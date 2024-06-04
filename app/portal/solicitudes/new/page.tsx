import RequestFormWithoutReference from "@/components/Forms/RequestFormWithoutReference";
import { getAuthSession } from "@/utils/AuthOptions";
import prisma from "@/utils/ConnectionPool";

export default async function page() {
  const session: any = await getAuthSession();

  const brands = await prisma.brand.findMany({
    where: {
      userEmail: session.user.email,
    },
    distinct: ["title"],
    select: {
      id: true,
      title: true,
    },
  });

  return (
    <div className="mx-auto max-w-6xl py-6">
      <h1 className="mb-4 w-11/12 text-center text-3xl lg:mb-3 lg:w-11/12 lg:text-left lg:text-4xl xl:mb-6 xl:text-6xl">
        Nueva Solicitud
      </h1>
      <p className="mb-8 text-center text-xs lg:mb-3 lg:text-left lg:text-base xl:mb-6 xl:text-lg"></p>
      Agrega una nueva solicitud a una marca
      <RequestFormWithoutReference brands={brands} />
    </div>
  );
}
