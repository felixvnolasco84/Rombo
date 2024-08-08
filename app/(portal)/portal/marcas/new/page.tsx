import BrandForm from "@/components/Forms/BrandForm";

export default function page() {
  return (
    <div className="">
      <h1 className="mb-4 w-11/12 text-center text-3xl lg:mb-3 lg:w-11/12 lg:text-left lg:text-4xl xl:mb-6 xl:text-6xl">
        Nueva Marca
      </h1>
      <p className="mb-8 text-center text-xs lg:mb-3 lg:text-left lg:text-base xl:mb-6 xl:text-lg">
        Agrega una nueva marca a tu organización
      </p>
      <BrandForm />
    </div>
  );
}
