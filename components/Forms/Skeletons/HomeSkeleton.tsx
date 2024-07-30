import { Skeleton, SVGSkeleton } from "@/components/Skeleton/Skeleton";

export default function HomeSkeleton() {
  return (
    <>
    <div className="flex flex-col gap-4 pb-6 lg:gap-7">
      <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-4 lg:gap-3 xl:gap-6">
        <div className="col-span-2 row-span-2 flex items-end shadow-lg">
          <div className="mx-auto flex w-10/12 flex-col items-center px-4 pb-12 pt-24 lg:w-full lg:items-start lg:px-4 lg:py-6 xl:px-9 xl:pb-9">
            <div className="relative mb-12 h-[54px] w-[68px] lg:hidden">
              <SVGSkeleton className="mb-12 h-4 w-4 object-cover" />
            </div>
            <h1 className="mb-4 w-11/12 lg:mb-3 lg:w-11/12 lg:text-left xl:mb-6">
              <Skeleton className="w-[352px] max-w-full" />
            </h1>
            <p className="mb-8 lg:mb-3 lg:text-left xl:mb-6">
              <Skeleton className="w-[584px] max-w-full" />
            </p>
            <div className="inline-flex w-fit items-center justify-center px-6 py-3 leading-none transition-colors lg:px-10 lg:py-3 xl:px-16 xl:py-4">
              <Skeleton className="w-[80px] max-w-full" />
            </div>
            <p className="mt-4 pl-2 lg:mt-2 xl:mt-4">
              <Skeleton className="w-[280px] max-w-full" />
            </p>
          </div>
        </div>
        <div className="col-span-2 hidden h-full lg:block">
          <div className="relative flex h-full flex-col justify-between shadow-lg group-hover:bg-[#F5F5F5] lg:px-4 lg:py-3 xl:px-5 xl:py-6">
            <div>
              <p>
                <Skeleton className="w-[224px] max-w-full" />
              </p>
              <a className="absolute right-4 top-4 lg:h-[24px] lg:w-[24px] xl:h-[32px] xl:w-[32px]">
                <SVGSkeleton className="object-fit h-4 w-4 object-cover" />
              </a>
            </div>
            <div className="flex flex-col items-center gap-8 xl:gap-16">
              <div className="relative lg:h-[54px] lg:w-[68px] xl:h-[109px] xl:w-[136px]">
                <SVGSkeleton className="object-fit h-4 w-4 object-cover" />
              </div>
              <h3 className="w-full text-left">
                <Skeleton className="w-[120px] max-w-full" />
              </h3>
            </div>
          </div>
        </div>
        <div className="col-span-1 hidden aspect-square h-full lg:block">
          <div className="relative flex h-full flex-col justify-between shadow-lg group-hover:bg-[#D9C4FF] lg:px-4 lg:py-3 xl:px-5 xl:py-6">
            <div>
              <p>
                <Skeleton className="w-[208px] max-w-full" />
              </p>
              <a className="absolute right-4 top-4 lg:h-[24px] lg:w-[24px] xl:h-[32px] xl:w-[32px]">
                <SVGSkeleton className="object-fit h-4 w-4 object-cover" />
              </a>
            </div>
            <div className="flex flex-col items-center gap-8 xl:gap-16">
              <div className="relative lg:h-[54px] lg:w-[68px] xl:h-[109px] xl:w-[136px]">
                <SVGSkeleton className="object-fit h-4 w-4 object-cover" />
              </div>
              <h3 className="w-full text-left">
                <Skeleton className="w-[80px] max-w-full" />
              </h3>
            </div>
          </div>
        </div>
        <div className="col-span-1 hidden aspect-square h-full lg:block">
          <div className="relative flex h-full flex-col justify-between shadow-lg group-hover:bg-[#D1FFA1] lg:px-4 lg:py-3 xl:px-5 xl:py-6">
            <div>
              <p>
                <Skeleton className="w-[96px] max-w-full" />
              </p>
              <a className="absolute right-4 top-4 lg:h-[24px] lg:w-[24px] xl:h-[32px] xl:w-[32px]">
                <SVGSkeleton className="object-fit h-4 w-4 object-cover" />
              </a>
            </div>
            <div className="flex flex-col items-center gap-8 xl:gap-16">
              <div className="relative lg:h-[54px] lg:w-[68px] xl:h-[109px] xl:w-[136px]">
                <SVGSkeleton className="object-fit h-4 w-4 object-cover" />
              </div>
              <h3 className="w-full text-left">
                <Skeleton className="w-[48px] max-w-full" />
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 pb-7 pt-10 lg:pb-14 lg:pt-20">
        <div className="mx-auto flex flex-col items-center">
          <h3>
            <Skeleton className="w-[272px] max-w-full" />
          </h3>
          <p className="lg:mt-3 lg:text-left xl:mt-5">
            <Skeleton className="w-[640px] max-w-full" />
          </p>
          <div className="mt-5 inline-flex items-center justify-center px-6 py-3 leading-none transition-colors lg:px-10 lg:py-3 xl:mt-9 xl:px-16 xl:py-4">
            <Skeleton className="w-[120px] max-w-full" />
          </div>
        </div>
      </div>
      <div>
        <div className="relative">
          <div>
            <div className="-ml-4 flex w-11/12">
              <div className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2">
                <div className="relative aspect-square min-h-[300px] min-w-[300px] shadow-lg lg:min-h-[400px] lg:min-w-[400px] xl:min-h-[600px] xl:min-w-[600px]">
                  <SVGSkeleton className="h-4 w-4 object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-100" />
                  <SVGSkeleton className="h-4 w-4 object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-0" />
                </div>
              </div>
              <div className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2">
                <div className="relative aspect-square min-h-[300px] min-w-[300px] shadow-lg lg:min-h-[400px] lg:min-w-[400px] xl:min-h-[600px] xl:min-w-[600px]">
                  <SVGSkeleton className="h-4 w-4 object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-100" />
                  <SVGSkeleton className="h-4 w-4 object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-0" />
                </div>
              </div>
              <div className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2">
                <div className="relative aspect-square min-h-[300px] min-w-[300px] shadow-lg lg:min-h-[400px] lg:min-w-[400px] xl:min-h-[600px] xl:min-w-[600px]">
                  <SVGSkeleton className="h-4 w-4 object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-100" />
                  <SVGSkeleton className="h-4 w-4 object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-0" />
                </div>
              </div>
              <div className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2">
                <div className="relative aspect-square min-h-[300px] min-w-[300px] shadow-lg lg:min-h-[400px] lg:min-w-[400px] xl:min-h-[600px] xl:min-w-[600px]">
                  <SVGSkeleton className="h-4 w-4 object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-100" />
                  <SVGSkeleton className="h-4 w-4 object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-0" />
                </div>
              </div>
              <div className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2">
                <div className="relative aspect-square min-h-[300px] min-w-[300px] shadow-lg lg:min-h-[400px] lg:min-w-[400px] xl:min-h-[600px] xl:min-w-[600px]">
                  <SVGSkeleton className="h-4 w-4 object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-100" />
                  <SVGSkeleton className="h-4 w-4 object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-0" />
                </div>
              </div>
              <div className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2">
                <div className="relative aspect-square min-h-[300px] min-w-[300px] shadow-lg lg:min-h-[400px] lg:min-w-[400px] xl:min-h-[600px] xl:min-w-[600px]">
                  <SVGSkeleton className="h-4 w-4 object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-100" />
                  <SVGSkeleton className="h-4 w-4 object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-0" />
                </div>
              </div>
              <div className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2">
                <div className="relative aspect-square min-h-[300px] min-w-[300px] shadow-lg lg:min-h-[400px] lg:min-w-[400px] xl:min-h-[600px] xl:min-w-[600px]">
                  <SVGSkeleton className="h-4 w-4 object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-100" />
                  <SVGSkeleton className="h-4 w-4 object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-0" />
                </div>
              </div>
              <div className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2">
                <div className="relative aspect-square min-h-[300px] min-w-[300px] shadow-lg lg:min-h-[400px] lg:min-w-[400px] xl:min-h-[600px] xl:min-w-[600px]">
                  <SVGSkeleton className="h-4 w-4 object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-100" />
                  <SVGSkeleton className="h-4 w-4 object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-0" />
                </div>
              </div>
              <div className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2">
                <div className="relative aspect-square min-h-[300px] min-w-[300px] shadow-lg lg:min-h-[400px] lg:min-w-[400px] xl:min-h-[600px] xl:min-w-[600px]">
                  <SVGSkeleton className="h-4 w-4 object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-100" />
                  <SVGSkeleton className="h-4 w-4 object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-0" />
                </div>
              </div>
              <div className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2">
                <div className="relative aspect-square min-h-[300px] min-w-[300px] shadow-lg lg:min-h-[400px] lg:min-w-[400px] xl:min-h-[600px] xl:min-w-[600px]">
                  <SVGSkeleton className="h-4 w-4 object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-100" />
                  <SVGSkeleton className="h-4 w-4 object-cover object-center transition-opacity duration-300 ease-linear group-hover:opacity-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-12 pt-12 lg:pt-24">
        <div className="mx-auto flex flex-col items-center lg:w-full">
          <div className="mx-auto flex w-3/4 flex-col items-center justify-center">
            <h3 className="mb-10 lg:mb-0">
              <Skeleton className="w-[312px] max-w-full" />
            </h3>
            <p className="mt-5 hidden lg:block">
              <Skeleton className="w-[264px] max-w-full" />
            </p>
          </div>
          <div className="flex w-1/2 flex-col items-baseline justify-center gap-10 lg:w-full lg:flex-row lg:gap-5 lg:p-12 xl:gap-10 xl:p-24">
            <div className="mx-auto flex flex-grow flex-col items-center lg:w-1/3">
              <div className="relative h-[54px] w-[68px] lg:h-[54px] lg:w-[68px] xl:h-[108px] xl:w-[136px]">
                <SVGSkeleton className="h-4 w-4 object-cover object-center" />
              </div>
              <p className="mt-8">
                <Skeleton className="w-[472px] max-w-full" />
              </p>
            </div>
            <div className="mx-auto flex flex-grow flex-col items-center lg:w-1/3">
              <div className="relative h-[54px] w-[68px] lg:h-[54px] lg:w-[68px] xl:h-[108px] xl:w-[136px]">
                <SVGSkeleton className="h-4 w-4 object-cover object-center" />
              </div>
              <p className="mt-8">
                <Skeleton className="w-[640px] max-w-full" />
              </p>
            </div>
            <div className="mx-auto flex flex-grow flex-col items-center lg:w-1/3">
              <div className="relative h-[54px] w-[68px] lg:h-[54px] lg:w-[68px] xl:h-[108px] xl:w-[136px]">
                <SVGSkeleton className="h-4 w-4 object-cover object-center" />
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
        <div className="hidden grid-cols-1 gap-2 md:grid-cols-2 lg:grid lg:grid-cols-4 xl:gap-4">
          <div className="relative col-span-1 border border-gray-100 px-4 py-9 shadow-xl xl:px-6 xl:py-9">
            <div className="flex flex-col">
              <h3>
                <Skeleton className="w-[64px] max-w-full" />
              </h3>
              <p>
                <Skeleton className="w-[296px] max-w-full" />
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mt-8 flex items-center justify-center gap-2 xl:mt-16">
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
              <div className="mt-8 inline-flex h-11 w-full items-center justify-center px-4 transition-colors xl:mt-16 xl:h-16 xl:px-[54px]">
                <Skeleton className="w-[120px] max-w-full" />
              </div>
              <div className="flex w-full justify-center border-b-2 border-[#C8FA70] pb-6 xl:pb-12">
                <a className="mx-auto">
                  <div className="mx-auto inline-flex w-fit items-center justify-center border-b-2 border-b-[#D5D5D5] pb-1 transition-colors">
                    <Skeleton className="w-[152px] max-w-full" />
                  </div>
                </a>
              </div>
            </div>
            <div className="pt-5 xl:pt-10">
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[208px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[256px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[200px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[256px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[112px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5"></div>
                <p>
                  <Skeleton className="w-[200px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5"></div>
                <p>
                  <Skeleton className="w-[184px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5"></div>
                <p>
                  <Skeleton className="w-[160px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5"></div>
                <p>
                  <Skeleton className="w-[104px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5"></div>
                <p>
                  <Skeleton className="w-[88px] max-w-full" />
                </p>
              </div>
            </div>
          </div>
          <div className="relative col-span-1 border border-gray-100 px-4 py-9 shadow-xl xl:px-6 xl:py-9">
            <div className="absolute -top-0 left-0 px-3 py-2 lg:-top-8 lg:px-5 lg:py-4">
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
              <div className="mt-8 flex items-center justify-center gap-2 xl:mt-16">
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
              <div className="mt-8 inline-flex h-11 w-full items-center justify-center px-4 transition-colors xl:mt-16 xl:h-16 xl:px-[54px]">
                <Skeleton className="w-[120px] max-w-full" />
              </div>
              <div className="flex w-full justify-center border-b-2 border-[#C8FA70] pb-6 xl:pb-12">
                <a className="mx-auto">
                  <div className="mx-auto inline-flex w-fit items-center justify-center border-b-2 border-b-[#D5D5D5] pb-1 transition-colors">
                    <Skeleton className="w-[152px] max-w-full" />
                  </div>
                </a>
              </div>
            </div>
            <div className="pt-5 xl:pt-10">
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[208px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[256px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[200px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[256px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[112px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[200px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[184px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[160px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5"></div>
                <p>
                  <Skeleton className="w-[104px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5"></div>
                <p>
                  <Skeleton className="w-[88px] max-w-full" />
                </p>
              </div>
            </div>
          </div>
          <div className="relative col-span-1 border border-gray-100 px-4 py-9 shadow-xl xl:px-6 xl:py-9">
            <div className="flex flex-col">
              <h3>
                <Skeleton className="w-[24px] max-w-full" />
              </h3>
              <p>
                <Skeleton className="w-[296px] max-w-full" />
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mt-8 flex items-center justify-center gap-2 xl:mt-16">
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
              <div className="mt-8 inline-flex h-11 w-full items-center justify-center px-4 transition-colors xl:mt-16 xl:h-16 xl:px-[54px]">
                <Skeleton className="w-[120px] max-w-full" />
              </div>
              <div className="flex w-full justify-center border-b-2 border-[#C8FA70] pb-6 xl:pb-12">
                <a className="mx-auto">
                  <div className="mx-auto inline-flex w-fit items-center justify-center border-b-2 border-b-[#D5D5D5] pb-1 transition-colors">
                    <Skeleton className="w-[152px] max-w-full" />
                  </div>
                </a>
              </div>
            </div>
            <div className="pt-5 xl:pt-10">
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[208px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[256px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[200px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[256px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[112px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[200px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[184px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[160px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[104px] max-w-full" />
                </p>
              </div>
              <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                  <SVGSkeleton className="h-[109px] w-[136px]" />
                </div>
                <p>
                  <Skeleton className="w-[88px] max-w-full" />
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col border border-gray-100 p-3 shadow-xl xl:p-9">
            <div className="flex h-1/2 flex-col items-center justify-center">
              <div className="relative aspect-square w-1/2 lg:mb-3 xl:mb-6">
                <SVGSkeleton className="h-4 w-4 object-fill object-center" />
              </div>
              <p>
                <Skeleton className="w-[152px] max-w-full" />
              </p>
              <p className="mt-2">
                <Skeleton className="w-[464px] max-w-full" />
              </p>
              <div className="inline-flex h-11 items-center justify-center px-4 transition-colors lg:mt-3 xl:mt-6 xl:h-16 xl:px-[54px]">
                <Skeleton className="w-[144px] max-w-full" />
              </div>
            </div>
            <div className="flex h-1/2 flex-col items-center justify-center border-t-2 border-[#C8FA70] lg:pt-3 xl:pt-6">
              <div className="relative aspect-square w-1/2 lg:mb-3 xl:mb-6">
                <SVGSkeleton className="h-4 w-4 object-fill object-center" />
              </div>
              <p>
                <Skeleton className="w-[144px] max-w-full" />
              </p>
              <p className="mt-2">
                <Skeleton className="w-[488px] max-w-full" />
              </p>
              <div className="mt-6 inline-flex h-11 items-center justify-center px-4 transition-colors lg:mt-3 xl:h-16 xl:px-[54px]">
                <Skeleton className="w-[144px] max-w-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative lg:hidden">
          <div>
            <div className="-ml-4 flex w-11/12">
              <div className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2">
                <div className="relative col-span-1 border border-gray-100 px-4 py-9 shadow-xl xl:px-6 xl:py-9">
                  <div className="flex flex-col">
                    <h3>
                      <Skeleton className="w-[64px] max-w-full" />
                    </h3>
                    <p>
                      <Skeleton className="w-[296px] max-w-full" />
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="mt-8 flex items-center justify-center gap-2 xl:mt-16">
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
                    <div className="mt-8 inline-flex h-11 w-full items-center justify-center px-4 transition-colors xl:mt-16 xl:h-16 xl:px-[54px]">
                      <Skeleton className="w-[120px] max-w-full" />
                    </div>
                    <div className="flex w-full justify-center border-b-2 border-[#C8FA70] pb-6 xl:pb-12">
                      <a className="mx-auto">
                        <div className="mx-auto inline-flex w-fit items-center justify-center border-b-2 border-b-[#D5D5D5] pb-1 transition-colors">
                          <Skeleton className="w-[152px] max-w-full" />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="pt-5 xl:pt-10">
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[208px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[256px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[200px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[256px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[112px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5"></div>
                      <p>
                        <Skeleton className="w-[200px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5"></div>
                      <p>
                        <Skeleton className="w-[184px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5"></div>
                      <p>
                        <Skeleton className="w-[160px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5"></div>
                      <p>
                        <Skeleton className="w-[104px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5"></div>
                      <p>
                        <Skeleton className="w-[88px] max-w-full" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2">
                <div className="relative col-span-1 border border-gray-100 px-4 py-9 shadow-xl xl:px-6 xl:py-9">
                  <div className="absolute -top-0 left-0 px-3 py-2 lg:-top-8 lg:px-5 lg:py-4">
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
                    <div className="mt-8 flex items-center justify-center gap-2 xl:mt-16">
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
                    <div className="mt-8 inline-flex h-11 w-full items-center justify-center px-4 transition-colors xl:mt-16 xl:h-16 xl:px-[54px]">
                      <Skeleton className="w-[120px] max-w-full" />
                    </div>
                    <div className="flex w-full justify-center border-b-2 border-[#C8FA70] pb-6 xl:pb-12">
                      <a className="mx-auto">
                        <div className="mx-auto inline-flex w-fit items-center justify-center border-b-2 border-b-[#D5D5D5] pb-1 transition-colors">
                          <Skeleton className="w-[152px] max-w-full" />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="pt-5 xl:pt-10">
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[208px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[256px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[200px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[256px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[112px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[200px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[184px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[160px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5"></div>
                      <p>
                        <Skeleton className="w-[104px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5"></div>
                      <p>
                        <Skeleton className="w-[88px] max-w-full" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2">
                <div className="relative col-span-1 border border-gray-100 px-4 py-9 shadow-xl xl:px-6 xl:py-9">
                  <div className="flex flex-col">
                    <h3>
                      <Skeleton className="w-[24px] max-w-full" />
                    </h3>
                    <p>
                      <Skeleton className="w-[296px] max-w-full" />
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="mt-8 flex items-center justify-center gap-2 xl:mt-16">
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
                    <div className="mt-8 inline-flex h-11 w-full items-center justify-center px-4 transition-colors xl:mt-16 xl:h-16 xl:px-[54px]">
                      <Skeleton className="w-[120px] max-w-full" />
                    </div>
                    <div className="flex w-full justify-center border-b-2 border-[#C8FA70] pb-6 xl:pb-12">
                      <a className="mx-auto">
                        <div className="mx-auto inline-flex w-fit items-center justify-center border-b-2 border-b-[#D5D5D5] pb-1 transition-colors">
                          <Skeleton className="w-[152px] max-w-full" />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="pt-5 xl:pt-10">
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[208px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[256px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[200px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[256px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[112px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[200px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[184px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[160px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
                      </div>
                      <p>
                        <Skeleton className="w-[104px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-1 lg:mt-2 xl:mt-4">
                      <div className="relative h-4 w-4 xl:h-5 xl:w-5">
                        <SVGSkeleton className="h-[109px] w-[136px]" />
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
      <div className="mx-auto flex w-10/12 flex-col-reverse items-center justify-center gap-4 py-12 lg:w-full lg:flex-row lg:gap-8 xl:py-24">
        <h3 className="lg:text-left">
          <Skeleton className="w-[224px] max-w-full" />
        </h3>
        <div className="relative aspect-square w-4/12 md:w-2/12 lg:w-1/12">
          <SVGSkeleton className="h-4 w-4 object-cover object-center" />
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-1 gap-4 lg:grid-cols-4 lg:gap-6">
        <div className="col-span-2 h-full">
          <div className="relative flex h-full items-center justify-between gap-4 px-6 py-6 shadow-md lg:px-4 lg:py-6 xl:gap-[75px] xl:px-9 xl:py-9">
            <div className="flex flex-col items-center gap-4 xl:gap-8">
              <div className="relative flex h-[54px] w-[68px] flex-col xl:h-[100px] xl:w-[62px]">
                <SVGSkeleton className="object-fit h-4 w-4 object-fill" />
              </div>
              <div className="inline-flex items-center justify-center px-6 py-3 leading-none transition-colors lg:px-10 lg:py-3 xl:px-16 xl:py-4">
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
          <div className="relative flex h-full items-center justify-between gap-4 px-6 py-6 shadow-md lg:px-4 lg:py-6 xl:gap-[75px] xl:px-9 xl:py-9">
            <div className="flex flex-col items-center gap-4 xl:gap-8">
              <div className="relative flex h-[54px] w-[68px] flex-col xl:h-[100px] xl:w-[62px]">
                <SVGSkeleton className="object-fit h-4 w-4 object-fill" />
              </div>
              <div className="inline-flex items-center justify-center px-6 py-3 leading-none transition-colors lg:px-10 lg:py-3 xl:px-16 xl:py-4">
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
        <h3 className="border-b-2 border-white py-4 lg:py-8 xl:py-16">
          <Skeleton className="w-[32px] max-w-full" />
        </h3>
        <div>
          <div className="border-y-2 border-white py-4 lg:py-8 xl:py-16">
            <div className="m-auto w-10/12 border-b border-none lg:w-2/3 xl:w-1/2">
              <h3 className="flex">
                <div className="flex flex-1 items-center justify-between text-left">
                  <Skeleton className="w-[248px] max-w-full" />
                  <SVGSkeleton className="h-[24px] w-[24px] shrink-0" />
                </div>
              </h3>
            </div>
          </div>
          <div className="border-y-2 border-white py-4 lg:py-8 xl:py-16">
            <div className="m-auto w-10/12 border-b border-none lg:w-2/3 xl:w-1/2">
              <h3 className="flex">
                <div className="flex flex-1 items-center justify-between text-left">
                  <Skeleton className="w-[488px] max-w-full" />
                  <SVGSkeleton className="h-[24px] w-[24px] shrink-0" />
                </div>
              </h3>
            </div>
          </div>
          <div className="border-y-2 border-white py-4 lg:py-8 xl:py-16">
            <div className="m-auto w-10/12 border-b border-none lg:w-2/3 xl:w-1/2">
              <h3 className="flex">
                <div className="flex flex-1 items-center justify-between text-left">
                  <Skeleton className="w-[296px] max-w-full" />
                  <SVGSkeleton className="h-[24px] w-[24px] shrink-0" />
                </div>
              </h3>
            </div>
          </div>
          <div className="border-y-2 border-white py-4 lg:py-8 xl:py-16">
            <div className="m-auto w-10/12 border-b border-none lg:w-2/3 xl:w-1/2">
              <h3 className="flex">
                <div className="flex flex-1 items-center justify-between text-left">
                  <Skeleton className="w-[280px] max-w-full" />
                  <SVGSkeleton className="h-[24px] w-[24px] shrink-0" />
                </div>
              </h3>
            </div>
          </div>
          <div className="border-y-2 border-white py-4 lg:py-8 xl:py-16">
            <div className="m-auto w-10/12 border-b border-none lg:w-2/3 xl:w-1/2">
              <h3 className="flex">
                <div className="flex flex-1 items-center justify-between text-left">
                  <Skeleton className="w-[280px] max-w-full" />
                  <SVGSkeleton className="h-[24px] w-[24px] shrink-0" />
                </div>
              </h3>
            </div>
          </div>
          <div className="border-y-2 border-white py-4 lg:py-8 xl:py-16">
            <div className="m-auto w-10/12 border-b border-none lg:w-2/3 xl:w-1/2">
              <h3 className="flex">
                <div className="flex flex-1 items-center justify-between text-left">
                  <Skeleton className="w-[344px] max-w-full" />
                  <SVGSkeleton className="h-[24px] w-[24px] shrink-0" />
                </div>
              </h3>
            </div>
          </div>
        </div>
        <div className="border-y-2 border-white py-4 lg:py-8 xl:py-16">
          <div>
            <div className="m-auto w-10/12 border-b border-none lg:w-2/3 xl:w-1/2">
              <h3 className="flex">
                <div className="flex flex-1 items-center justify-between">
                  <Skeleton className="w-[240px] max-w-full" />
                  <SVGSkeleton className="h-[24px] w-[24px] shrink-0" />
                </div>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
