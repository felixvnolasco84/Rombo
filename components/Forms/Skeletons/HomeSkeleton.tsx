import { Skeleton, SVGSkeleton } from "@/components/Skeleton/Skeleton";

export default function HomeSkeleton() {
  return (
    <>
    <main className="flex flex-col gap-4 lg:gap-7 pb-6">
      <div className="lg:gap-3 xl:gap-6 grid grid-cols-1 lg:grid-cols-4 grid-rows-2">
        <div className="flex items-end col-span-2 row-span-2 shadow-lg">
          <div className="flex flex-col items-center lg:items-start mx-auto px-4 lg:px-4 xl:px-9 lg:py-6 pt-24 pb-12 xl:pb-9 w-10/12 lg:w-full">
            <div className="relative lg:hidden mb-12 w-[68px] h-[54px]">
              <SVGSkeleton className="mb-12 w-4 h-4 object-cover" />
            </div>
            <h1 className="mb-4 lg:mb-3 xl:mb-6 w-11/12 lg:w-11/12 lg:text-left">
              <Skeleton className="w-[352px] max-w-full" />
            </h1>
            <p className="mb-8 lg:mb-3 xl:mb-6 lg:text-left">
              <Skeleton className="w-[584px] max-w-full" />
            </p>
            <div className="inline-flex justify-center items-center px-6 lg:px-10 xl:px-16 py-3 lg:py-3 xl:py-4 w-fit leading-none transition-colors">
              <Skeleton className="w-[80px] max-w-full" />
            </div>
            <p className="mt-4 lg:mt-2 xl:mt-4 pl-2">
              <Skeleton className="w-[280px] max-w-full" />
            </p>
          </div>
        </div>
        <div className="lg:block hidden col-span-2 h-full">
          <div className="group-hover:bg-[#F5F5F5] relative flex flex-col justify-between shadow-lg lg:px-4 xl:px-5 lg:py-3 xl:py-6 h-full">
            <div>
              <p>
                <Skeleton className="w-[224px] max-w-full" />
              </p>
              <a className="top-4 right-4 absolute lg:w-[24px] xl:w-[32px] lg:h-[24px] xl:h-[32px]">
                <SVGSkeleton className="w-4 h-4 object-cover object-fit" />
              </a>
            </div>
            <div className="flex flex-col items-center gap-8 xl:gap-16">
              <div className="relative lg:w-[68px] xl:w-[136px] lg:h-[54px] xl:h-[109px]">
                <SVGSkeleton className="w-4 h-4 object-cover object-fit" />
              </div>
              <h3 className="w-full text-left">
                <Skeleton className="w-[120px] max-w-full" />
              </h3>
            </div>
          </div>
        </div>
        <div className="lg:block hidden col-span-1 h-full aspect-square">
          <div className="group-hover:bg-[#D9C4FF] relative flex flex-col justify-between shadow-lg lg:px-4 xl:px-5 lg:py-3 xl:py-6 h-full">
            <div>
              <p>
                <Skeleton className="w-[208px] max-w-full" />
              </p>
              <a className="top-4 right-4 absolute lg:w-[24px] xl:w-[32px] lg:h-[24px] xl:h-[32px]">
                <SVGSkeleton className="w-4 h-4 object-cover object-fit" />
              </a>
            </div>
            <div className="flex flex-col items-center gap-8 xl:gap-16">
              <div className="relative lg:w-[68px] xl:w-[136px] lg:h-[54px] xl:h-[109px]">
                <SVGSkeleton className="w-4 h-4 object-cover object-fit" />
              </div>
              <h3 className="w-full text-left">
                <Skeleton className="w-[80px] max-w-full" />
              </h3>
            </div>
          </div>
        </div>
        <div className="lg:block hidden col-span-1 h-full aspect-square">
          <div className="group-hover:bg-[#D1FFA1] relative flex flex-col justify-between shadow-lg lg:px-4 xl:px-5 lg:py-3 xl:py-6 h-full">
            <div>
              <p>
                <Skeleton className="w-[96px] max-w-full" />
              </p>
              <a className="top-4 right-4 absolute lg:w-[24px] xl:w-[32px] lg:h-[24px] xl:h-[32px]">
                <SVGSkeleton className="w-4 h-4 object-cover object-fit" />
              </a>
            </div>
            <div className="flex flex-col items-center gap-8 xl:gap-16">
              <div className="relative lg:w-[68px] xl:w-[136px] lg:h-[54px] xl:h-[109px]">
                <SVGSkeleton className="w-4 h-4 object-cover object-fit" />
              </div>
              <h3 className="w-full text-left">
                <Skeleton className="w-[48px] max-w-full" />
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 pt-10 lg:pt-20 pb-7 lg:pb-14">
        <div className="flex flex-col items-center mx-auto">
          <h3>
            <Skeleton className="w-[272px] max-w-full" />
          </h3>
          <p className="lg:mt-3 xl:mt-5 lg:text-left">
            <Skeleton className="w-[640px] max-w-full" />
          </p>
          <div className="inline-flex justify-center items-center mt-5 xl:mt-9 px-6 lg:px-10 xl:px-16 py-3 lg:py-3 xl:py-4 leading-none transition-colors">
            <Skeleton className="w-[120px] max-w-full" />
          </div>
        </div>
      </div>
      <div>
        <div className="relative">
          <div>
            <div className="flex -ml-4 w-11/12">
              <div className="pl-4 grow-0 min-w-0 basis-full shrink-0 md:basis-1/2">
                <div className="relative shadow-lg min-w-[300px] lg:min-w-[400px] xl:min-w-[600px] min-h-[300px] lg:min-h-[400px] xl:min-h-[600px] aspect-square">
                  <SVGSkeleton className="group-hover:opacity-100 w-4 h-4 transition-opacity duration-300 ease-linear object-center object-cover" />
                  <SVGSkeleton className="group-hover:opacity-0 w-4 h-4 transition-opacity duration-300 ease-linear object-center object-cover" />
                </div>
              </div>
              <div className="pl-4 grow-0 min-w-0 basis-full shrink-0 md:basis-1/2">
                <div className="relative shadow-lg min-w-[300px] lg:min-w-[400px] xl:min-w-[600px] min-h-[300px] lg:min-h-[400px] xl:min-h-[600px] aspect-square">
                  <SVGSkeleton className="group-hover:opacity-100 w-4 h-4 transition-opacity duration-300 ease-linear object-center object-cover" />
                  <SVGSkeleton className="group-hover:opacity-0 w-4 h-4 transition-opacity duration-300 ease-linear object-center object-cover" />
                </div>
              </div>
              <div className="pl-4 grow-0 min-w-0 basis-full shrink-0 md:basis-1/2">
                <div className="relative shadow-lg min-w-[300px] lg:min-w-[400px] xl:min-w-[600px] min-h-[300px] lg:min-h-[400px] xl:min-h-[600px] aspect-square">
                  <SVGSkeleton className="group-hover:opacity-100 w-4 h-4 transition-opacity duration-300 ease-linear object-center object-cover" />
                  <SVGSkeleton className="group-hover:opacity-0 w-4 h-4 transition-opacity duration-300 ease-linear object-center object-cover" />
                </div>
              </div>
              <div className="pl-4 grow-0 min-w-0 basis-full shrink-0 md:basis-1/2">
                <div className="relative shadow-lg min-w-[300px] lg:min-w-[400px] xl:min-w-[600px] min-h-[300px] lg:min-h-[400px] xl:min-h-[600px] aspect-square">
                  <SVGSkeleton className="group-hover:opacity-100 w-4 h-4 transition-opacity duration-300 ease-linear object-center object-cover" />
                  <SVGSkeleton className="group-hover:opacity-0 w-4 h-4 transition-opacity duration-300 ease-linear object-center object-cover" />
                </div>
              </div>
              <div className="pl-4 grow-0 min-w-0 basis-full shrink-0 md:basis-1/2">
                <div className="relative shadow-lg min-w-[300px] lg:min-w-[400px] xl:min-w-[600px] min-h-[300px] lg:min-h-[400px] xl:min-h-[600px] aspect-square">
                  <SVGSkeleton className="group-hover:opacity-100 w-4 h-4 transition-opacity duration-300 ease-linear object-center object-cover" />
                  <SVGSkeleton className="group-hover:opacity-0 w-4 h-4 transition-opacity duration-300 ease-linear object-center object-cover" />
                </div>
              </div>
              <div className="pl-4 grow-0 min-w-0 basis-full shrink-0 md:basis-1/2">
                <div className="relative shadow-lg min-w-[300px] lg:min-w-[400px] xl:min-w-[600px] min-h-[300px] lg:min-h-[400px] xl:min-h-[600px] aspect-square">
                  <SVGSkeleton className="group-hover:opacity-100 w-4 h-4 transition-opacity duration-300 ease-linear object-center object-cover" />
                  <SVGSkeleton className="group-hover:opacity-0 w-4 h-4 transition-opacity duration-300 ease-linear object-center object-cover" />
                </div>
              </div>
              <div className="pl-4 grow-0 min-w-0 basis-full shrink-0 md:basis-1/2">
                <div className="relative shadow-lg min-w-[300px] lg:min-w-[400px] xl:min-w-[600px] min-h-[300px] lg:min-h-[400px] xl:min-h-[600px] aspect-square">
                  <SVGSkeleton className="group-hover:opacity-100 w-4 h-4 transition-opacity duration-300 ease-linear object-center object-cover" />
                  <SVGSkeleton className="group-hover:opacity-0 w-4 h-4 transition-opacity duration-300 ease-linear object-center object-cover" />
                </div>
              </div>
              <div className="pl-4 grow-0 min-w-0 basis-full shrink-0 md:basis-1/2">
                <div className="relative shadow-lg min-w-[300px] lg:min-w-[400px] xl:min-w-[600px] min-h-[300px] lg:min-h-[400px] xl:min-h-[600px] aspect-square">
                  <SVGSkeleton className="group-hover:opacity-100 w-4 h-4 transition-opacity duration-300 ease-linear object-center object-cover" />
                  <SVGSkeleton className="group-hover:opacity-0 w-4 h-4 transition-opacity duration-300 ease-linear object-center object-cover" />
                </div>
              </div>
              <div className="pl-4 grow-0 min-w-0 basis-full shrink-0 md:basis-1/2">
                <div className="relative shadow-lg min-w-[300px] lg:min-w-[400px] xl:min-w-[600px] min-h-[300px] lg:min-h-[400px] xl:min-h-[600px] aspect-square">
                  <SVGSkeleton className="group-hover:opacity-100 w-4 h-4 transition-opacity duration-300 ease-linear object-center object-cover" />
                  <SVGSkeleton className="group-hover:opacity-0 w-4 h-4 transition-opacity duration-300 ease-linear object-center object-cover" />
                </div>
              </div>
              <div className="pl-4 grow-0 min-w-0 basis-full shrink-0 md:basis-1/2">
                <div className="relative shadow-lg min-w-[300px] lg:min-w-[400px] xl:min-w-[600px] min-h-[300px] lg:min-h-[400px] xl:min-h-[600px] aspect-square">
                  <SVGSkeleton className="group-hover:opacity-100 w-4 h-4 transition-opacity duration-300 ease-linear object-center object-cover" />
                  <SVGSkeleton className="group-hover:opacity-0 w-4 h-4 transition-opacity duration-300 ease-linear object-center object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-12 lg:pt-24 pb-12">
        <div className="flex flex-col items-center mx-auto lg:w-full">
          <div className="flex flex-col justify-center items-center mx-auto w-3/4">
            <h3 className="mb-10 lg:mb-0">
              <Skeleton className="w-[312px] max-w-full" />
            </h3>
            <p className="lg:block hidden mt-5">
              <Skeleton className="w-[264px] max-w-full" />
            </p>
          </div>
          <div className="flex lg:flex-row flex-col justify-center items-baseline gap-10 lg:gap-5 xl:gap-10 lg:p-12 xl:p-24 w-1/2 lg:w-full">
            <div className="flex flex-col flex-grow items-center mx-auto lg:w-1/3">
              <div className="relative w-[68px] lg:w-[68px] xl:w-[136px] h-[54px] lg:h-[54px] xl:h-[108px]">
                <SVGSkeleton className="w-4 h-4 object-center object-cover" />
              </div>
              <p className="mt-8">
                <Skeleton className="w-[472px] max-w-full" />
              </p>
            </div>
            <div className="flex flex-col flex-grow items-center mx-auto lg:w-1/3">
              <div className="relative w-[68px] lg:w-[68px] xl:w-[136px] h-[54px] lg:h-[54px] xl:h-[108px]">
                <SVGSkeleton className="w-4 h-4 object-center object-cover" />
              </div>
              <p className="mt-8">
                <Skeleton className="w-[640px] max-w-full" />
              </p>
            </div>
            <div className="flex flex-col flex-grow items-center mx-auto lg:w-1/3">
              <div className="relative w-[68px] lg:w-[68px] xl:w-[136px] h-[54px] lg:h-[54px] xl:h-[108px]">
                <SVGSkeleton className="w-4 h-4 object-center object-cover" />
              </div>
              <p className="mt-8">
                <Skeleton className="w-[448px] max-w-full" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="py-12 xl:py-24">
          <h3>
            <Skeleton className="w-[160px] max-w-full" />
          </h3>
          <p>
            <Skeleton className="w-[312px] max-w-full" />
          </p>
        </div>
        <div className="gap-2 xl:gap-4 hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative border-gray-100 col-span-1 shadow-xl px-4 xl:px-6 py-9 xl:py-9 border">
            <div className="flex flex-col">
              <h3>
                <Skeleton className="w-[64px] max-w-full" />
              </h3>
              <p>
                <Skeleton className="w-[296px] max-w-full" />
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center items-center gap-2 mt-8 xl:mt-16">
                <p>
                  <Skeleton className="w-[56px] max-w-full" />
                </p>
                <div>
                  <p>
                    <Skeleton className="w-[24px] max-w-full" />
                  </p>
                  <p>
                    <Skeleton className="w-[72px] max-w-full" />
                  </p>
                </div>
              </div>
              <p className="lg:mt-2 xl:mt-3">
                <Skeleton className="w-[288px] max-w-full" />
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="inline-flex justify-center items-center mt-8 xl:mt-16 px-4 xl:px-[54px] w-full h-11 xl:h-16 transition-colors">
                <Skeleton className="w-[120px] max-w-full" />
              </div>
              <div className="flex justify-center border-[#C8FA70] pb-6 xl:pb-12 border-b-2 w-full">
                <a className="mx-auto">
                  <div className="inline-flex justify-center items-center mx-auto pb-1 border-b-[#D5D5D5] border-b-2 w-fit transition-colors">
                    <Skeleton className="w-[152px] max-w-full" />
                  </div>
                </a>
              </div>
            </div>
            <div className="pt-5 xl:pt-10">
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[208px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[256px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[200px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[256px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[112px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5"></div>
                <p>
                  <Skeleton className="w-[200px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5"></div>
                <p>
                  <Skeleton className="w-[184px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5"></div>
                <p>
                  <Skeleton className="w-[160px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5"></div>
                <p>
                  <Skeleton className="w-[104px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5"></div>
                <p>
                  <Skeleton className="w-[88px] max-w-full" />
                </p>
              </div>
            </div>
          </div>
          <div className="relative border-gray-100 col-span-1 shadow-xl px-4 xl:px-6 py-9 xl:py-9 border">
            <div className="-top-0 lg:-top-8 left-0 absolute px-3 lg:px-5 py-2 lg:py-4">
              <p>
                <Skeleton className="w-[88px] max-w-full" />
              </p>
            </div>
            <div className="flex flex-col">
              <h3>
                <Skeleton className="w-[56px] max-w-full" />
              </h3>
              <p>
                <Skeleton className="w-[296px] max-w-full" />
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center items-center gap-2 mt-8 xl:mt-16">
                <p>
                  <Skeleton className="w-[56px] max-w-full" />
                </p>
                <div>
                  <p>
                    <Skeleton className="w-[24px] max-w-full" />
                  </p>
                  <p>
                    <Skeleton className="w-[72px] max-w-full" />
                  </p>
                </div>
              </div>
              <p className="lg:mt-2 xl:mt-3">
                <Skeleton className="w-[288px] max-w-full" />
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="inline-flex justify-center items-center mt-8 xl:mt-16 px-4 xl:px-[54px] w-full h-11 xl:h-16 transition-colors">
                <Skeleton className="w-[120px] max-w-full" />
              </div>
              <div className="flex justify-center border-[#C8FA70] pb-6 xl:pb-12 border-b-2 w-full">
                <a className="mx-auto">
                  <div className="inline-flex justify-center items-center mx-auto pb-1 border-b-[#D5D5D5] border-b-2 w-fit transition-colors">
                    <Skeleton className="w-[152px] max-w-full" />
                  </div>
                </a>
              </div>
            </div>
            <div className="pt-5 xl:pt-10">
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[208px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[256px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[200px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[256px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[112px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[200px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[184px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[160px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5"></div>
                <p>
                  <Skeleton className="w-[104px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5"></div>
                <p>
                  <Skeleton className="w-[88px] max-w-full" />
                </p>
              </div>
            </div>
          </div>
          <div className="relative border-gray-100 col-span-1 shadow-xl px-4 xl:px-6 py-9 xl:py-9 border">
            <div className="flex flex-col">
              <h3>
                <Skeleton className="w-[24px] max-w-full" />
              </h3>
              <p>
                <Skeleton className="w-[296px] max-w-full" />
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center items-center gap-2 mt-8 xl:mt-16">
                <p>
                  <Skeleton className="w-[56px] max-w-full" />
                </p>
                <div>
                  <p>
                    <Skeleton className="w-[24px] max-w-full" />
                  </p>
                  <p>
                    <Skeleton className="w-[72px] max-w-full" />
                  </p>
                </div>
              </div>
              <p className="lg:mt-2 xl:mt-3">
                <Skeleton className="w-[288px] max-w-full" />
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="inline-flex justify-center items-center mt-8 xl:mt-16 px-4 xl:px-[54px] w-full h-11 xl:h-16 transition-colors">
                <Skeleton className="w-[120px] max-w-full" />
              </div>
              <div className="flex justify-center border-[#C8FA70] pb-6 xl:pb-12 border-b-2 w-full">
                <a className="mx-auto">
                  <div className="inline-flex justify-center items-center mx-auto pb-1 border-b-[#D5D5D5] border-b-2 w-fit transition-colors">
                    <Skeleton className="w-[152px] max-w-full" />
                  </div>
                </a>
              </div>
            </div>
            <div className="pt-5 xl:pt-10">
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[208px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[256px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[200px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[256px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[112px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[200px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[184px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[160px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[104px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                  <SVGSkeleton className="w-[136px] h-[109px]" />
                </div>
                <p>
                  <Skeleton className="w-[88px] max-w-full" />
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col border-gray-100 shadow-xl p-3 xl:p-9 border">
            <div className="flex flex-col justify-center items-center h-1/2">
              <div className="relative lg:mb-3 xl:mb-6 w-1/2 aspect-square">
                <SVGSkeleton className="w-4 h-4 object-center object-fill" />
              </div>
              <p>
                <Skeleton className="w-[152px] max-w-full" />
              </p>
              <p className="mt-2">
                <Skeleton className="w-[464px] max-w-full" />
              </p>
              <div className="inline-flex justify-center items-center lg:mt-3 xl:mt-6 px-4 xl:px-[54px] h-11 xl:h-16 transition-colors">
                <Skeleton className="w-[144px] max-w-full" />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center border-[#C8FA70] lg:pt-3 xl:pt-6 border-t-2 h-1/2">
              <div className="relative lg:mb-3 xl:mb-6 w-1/2 aspect-square">
                <SVGSkeleton className="w-4 h-4 object-center object-fill" />
              </div>
              <p>
                <Skeleton className="w-[144px] max-w-full" />
              </p>
              <p className="mt-2">
                <Skeleton className="w-[488px] max-w-full" />
              </p>
              <div className="inline-flex justify-center items-center mt-6 lg:mt-3 px-4 xl:px-[54px] h-11 xl:h-16 transition-colors">
                <Skeleton className="w-[144px] max-w-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative lg:hidden">
          <div>
            <div className="flex -ml-4 w-11/12">
              <div className="pl-4 grow-0 min-w-0 basis-full shrink-0 md:basis-1/2">
                <div className="relative border-gray-100 col-span-1 shadow-xl px-4 xl:px-6 py-9 xl:py-9 border">
                  <div className="flex flex-col">
                    <h3>
                      <Skeleton className="w-[64px] max-w-full" />
                    </h3>
                    <p>
                      <Skeleton className="w-[296px] max-w-full" />
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-center items-center gap-2 mt-8 xl:mt-16">
                      <p>
                        <Skeleton className="w-[56px] max-w-full" />
                      </p>
                      <div>
                        <p>
                          <Skeleton className="w-[24px] max-w-full" />
                        </p>
                        <p>
                          <Skeleton className="w-[72px] max-w-full" />
                        </p>
                      </div>
                    </div>
                    <p className="lg:mt-2 xl:mt-3">
                      <Skeleton className="w-[288px] max-w-full" />
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="inline-flex justify-center items-center mt-8 xl:mt-16 px-4 xl:px-[54px] w-full h-11 xl:h-16 transition-colors">
                      <Skeleton className="w-[120px] max-w-full" />
                    </div>
                    <div className="flex justify-center border-[#C8FA70] pb-6 xl:pb-12 border-b-2 w-full">
                      <a className="mx-auto">
                        <div className="inline-flex justify-center items-center mx-auto pb-1 border-b-[#D5D5D5] border-b-2 w-fit transition-colors">
                          <Skeleton className="w-[152px] max-w-full" />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="pt-5 xl:pt-10">
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[208px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[256px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[200px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[256px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[112px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5"></div>
                      <p>
                        <Skeleton className="w-[200px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5"></div>
                      <p>
                        <Skeleton className="w-[184px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5"></div>
                      <p>
                        <Skeleton className="w-[160px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5"></div>
                      <p>
                        <Skeleton className="w-[104px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5"></div>
                      <p>
                        <Skeleton className="w-[88px] max-w-full" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pl-4 grow-0 min-w-0 basis-full shrink-0 md:basis-1/2">
                <div className="relative border-gray-100 col-span-1 shadow-xl px-4 xl:px-6 py-9 xl:py-9 border">
                  <div className="-top-0 lg:-top-8 left-0 absolute px-3 lg:px-5 py-2 lg:py-4">
                    <p>
                      <Skeleton className="w-[88px] max-w-full" />
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <h3>
                      <Skeleton className="w-[56px] max-w-full" />
                    </h3>
                    <p>
                      <Skeleton className="w-[296px] max-w-full" />
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-center items-center gap-2 mt-8 xl:mt-16">
                      <p>
                        <Skeleton className="w-[56px] max-w-full" />
                      </p>
                      <div>
                        <p>
                          <Skeleton className="w-[24px] max-w-full" />
                        </p>
                        <p>
                          <Skeleton className="w-[72px] max-w-full" />
                        </p>
                      </div>
                    </div>
                    <p className="lg:mt-2 xl:mt-3">
                      <Skeleton className="w-[288px] max-w-full" />
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="inline-flex justify-center items-center mt-8 xl:mt-16 px-4 xl:px-[54px] w-full h-11 xl:h-16 transition-colors">
                      <Skeleton className="w-[120px] max-w-full" />
                    </div>
                    <div className="flex justify-center border-[#C8FA70] pb-6 xl:pb-12 border-b-2 w-full">
                      <a className="mx-auto">
                        <div className="inline-flex justify-center items-center mx-auto pb-1 border-b-[#D5D5D5] border-b-2 w-fit transition-colors">
                          <Skeleton className="w-[152px] max-w-full" />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="pt-5 xl:pt-10">
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[208px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[256px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[200px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[256px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[112px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[200px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[184px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[160px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5"></div>
                      <p>
                        <Skeleton className="w-[104px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5"></div>
                      <p>
                        <Skeleton className="w-[88px] max-w-full" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pl-4 grow-0 min-w-0 basis-full shrink-0 md:basis-1/2">
                <div className="relative border-gray-100 col-span-1 shadow-xl px-4 xl:px-6 py-9 xl:py-9 border">
                  <div className="flex flex-col">
                    <h3>
                      <Skeleton className="w-[24px] max-w-full" />
                    </h3>
                    <p>
                      <Skeleton className="w-[296px] max-w-full" />
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-center items-center gap-2 mt-8 xl:mt-16">
                      <p>
                        <Skeleton className="w-[56px] max-w-full" />
                      </p>
                      <div>
                        <p>
                          <Skeleton className="w-[24px] max-w-full" />
                        </p>
                        <p>
                          <Skeleton className="w-[72px] max-w-full" />
                        </p>
                      </div>
                    </div>
                    <p className="lg:mt-2 xl:mt-3">
                      <Skeleton className="w-[288px] max-w-full" />
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="inline-flex justify-center items-center mt-8 xl:mt-16 px-4 xl:px-[54px] w-full h-11 xl:h-16 transition-colors">
                      <Skeleton className="w-[120px] max-w-full" />
                    </div>
                    <div className="flex justify-center border-[#C8FA70] pb-6 xl:pb-12 border-b-2 w-full">
                      <a className="mx-auto">
                        <div className="inline-flex justify-center items-center mx-auto pb-1 border-b-[#D5D5D5] border-b-2 w-fit transition-colors">
                          <Skeleton className="w-[152px] max-w-full" />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="pt-5 xl:pt-10">
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[208px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[256px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[200px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[256px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[112px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[200px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[184px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[160px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[104px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative w-4 xl:w-5 h-4 xl:h-5">
                        <SVGSkeleton className="w-[136px] h-[109px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[88px] max-w-full" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col-reverse justify-center items-center gap-4 lg:gap-8 mx-auto py-12 xl:py-24 w-10/12 lg:w-full">
        <h3 className="lg:text-left">
          <Skeleton className="w-[224px] max-w-full" />
        </h3>
        <div className="relative w-4/12 md:w-2/12 lg:w-1/12 aspect-square">
          <SVGSkeleton className="w-4 h-4 object-center object-cover" />
        </div>
      </div>
      <div className="gap-4 lg:gap-6 grid grid-cols-2 lg:grid-cols-4 grid-rows-1">
        <div className="col-span-2 h-full">
          <div className="relative flex justify-between items-center gap-4 xl:gap-[75px] shadow-md px-6 lg:px-4 xl:px-9 py-6 lg:py-6 xl:py-9 h-full">
            <div className="flex flex-col items-center gap-4 xl:gap-8">
              <div className="relative flex flex-col w-[68px] xl:w-[62px] h-[54px] xl:h-[100px]">
                <SVGSkeleton className="w-4 h-4 object-fill object-fit" />
              </div>
              <div className="inline-flex justify-center items-center px-6 lg:px-10 xl:px-16 py-3 lg:py-3 xl:py-4 leading-none transition-colors">
                <a>
                  <Skeleton className="w-[56px] max-w-full" />
                </a>
              </div>
            </div>
            <div className="flex flex-col lg:gap-3 xl:gap-5">
              <h3>
                <Skeleton className="w-[144px] max-w-full" />
              </h3>
              <p>
                <Skeleton className="w-[376px] max-w-full" />
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-2 h-full">
          <div className="relative flex justify-between items-center gap-4 xl:gap-[75px] shadow-md px-6 lg:px-4 xl:px-9 py-6 lg:py-6 xl:py-9 h-full">
            <div className="flex flex-col items-center gap-4 xl:gap-8">
              <div className="relative flex flex-col w-[68px] xl:w-[62px] h-[54px] xl:h-[100px]">
                <SVGSkeleton className="w-4 h-4 object-fill object-fit" />
              </div>
              <div className="inline-flex justify-center items-center px-6 lg:px-10 xl:px-16 py-3 lg:py-3 xl:py-4 leading-none transition-colors">
                <a>
                  <Skeleton className="w-[40px] max-w-full" />
                </a>
              </div>
            </div>
            <div className="flex flex-col lg:gap-3 xl:gap-5">
              <h3>
                <Skeleton className="w-[144px] max-w-full" />
              </h3>
              <p>
                <Skeleton className="w-[520px] max-w-full" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="border-white py-4 lg:py-8 xl:py-16 border-b-2">
          <Skeleton className="w-[32px] max-w-full" />
        </h3>
        <div>
          <div className="border-white border-y-2 py-4 lg:py-8 xl:py-16">
            <div className="m-auto border-b border-none w-10/12 lg:w-2/3 xl:w-1/2">
              <h3 className="flex">
                <div className="flex flex-1 justify-between items-center text-left">
                  <Skeleton className="w-[248px] max-w-full" />
                  <SVGSkeleton className="w-[24px] h-[24px] shrink-0" />
                </div>
              </h3>
            </div>
          </div>
          <div className="border-white border-y-2 py-4 lg:py-8 xl:py-16">
            <div className="m-auto border-b border-none w-10/12 lg:w-2/3 xl:w-1/2">
              <h3 className="flex">
                <div className="flex flex-1 justify-between items-center text-left">
                  <Skeleton className="w-[488px] max-w-full" />
                  <SVGSkeleton className="w-[24px] h-[24px] shrink-0" />
                </div>
              </h3>
            </div>
          </div>
          <div className="border-white border-y-2 py-4 lg:py-8 xl:py-16">
            <div className="m-auto border-b border-none w-10/12 lg:w-2/3 xl:w-1/2">
              <h3 className="flex">
                <div className="flex flex-1 justify-between items-center text-left">
                  <Skeleton className="w-[296px] max-w-full" />
                  <SVGSkeleton className="w-[24px] h-[24px] shrink-0" />
                </div>
              </h3>
            </div>
          </div>
          <div className="border-white border-y-2 py-4 lg:py-8 xl:py-16">
            <div className="m-auto border-b border-none w-10/12 lg:w-2/3 xl:w-1/2">
              <h3 className="flex">
                <div className="flex flex-1 justify-between items-center text-left">
                  <Skeleton className="w-[280px] max-w-full" />
                  <SVGSkeleton className="w-[24px] h-[24px] shrink-0" />
                </div>
              </h3>
            </div>
          </div>
          <div className="border-white border-y-2 py-4 lg:py-8 xl:py-16">
            <div className="m-auto border-b border-none w-10/12 lg:w-2/3 xl:w-1/2">
              <h3 className="flex">
                <div className="flex flex-1 justify-between items-center text-left">
                  <Skeleton className="w-[280px] max-w-full" />
                  <SVGSkeleton className="w-[24px] h-[24px] shrink-0" />
                </div>
              </h3>
            </div>
          </div>
          <div className="border-white border-y-2 py-4 lg:py-8 xl:py-16">
            <div className="m-auto border-b border-none w-10/12 lg:w-2/3 xl:w-1/2">
              <h3 className="flex">
                <div className="flex flex-1 justify-between items-center text-left">
                  <Skeleton className="w-[344px] max-w-full" />
                  <SVGSkeleton className="w-[24px] h-[24px] shrink-0" />
                </div>
              </h3>
            </div>
          </div>
        </div>
        <div className="border-white border-y-2 py-4 lg:py-8 xl:py-16">
          <div>
            <div className="m-auto border-b border-none w-10/12 lg:w-2/3 xl:w-1/2">
              <h3 className="flex">
                <div className="flex flex-1 justify-between items-center">
                  <Skeleton className="w-[240px] max-w-full" />
                  <SVGSkeleton className="w-[24px] h-[24px] shrink-0" />
                </div>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  </>
  )
}
