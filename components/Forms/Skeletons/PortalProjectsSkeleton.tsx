import { Skeleton, SVGSkeleton } from "@/components/Skeleton/Skeleton";

export default function PortalProjectsSkeleton() {
  return (
    <>
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col">
        <div className="flex items-center px-4">
          <nav className="hidden md:flex">
            <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
              <li className="inline-flex items-center gap-1.5">
                <a className="transition-colors">
                  <Skeleton className="w-[48px] max-w-full" />
                </a>
              </li>
              <li className="[&amp;>svg]:size-3.5">
                <SVGSkeleton className="lucide-chevron-right h-[24px] w-[24px]" />
              </li>
              <li className="inline-flex items-center gap-1.5">
                <a className="transition-colors">
                  <Skeleton className="w-[72px] max-w-full" />
                </a>
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <div className="ml-auto flex items-center justify-end gap-2">
            <div className="inline-flex h-9 items-center justify-center px-3 transition-colors">
              <a className="flex items-center gap-1">
                <SVGSkeleton className="aspect-square h-[24px] w-[24px]" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2">
            <div className="border shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6 pb-0">
                <h3 className="leading-none tracking-tight">
                  <a>
                    <Skeleton className="w-[80px] max-w-full" />
                  </a>
                </h3>
                <p>
                  <Skeleton className="w-[240px] max-w-full" />
                </p>
              </div>
              <div className="p-6 pt-0">
                <p className="mt-4">
                  <Skeleton className="w-[800px] max-w-full" />
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <SVGSkeleton className="h-[24px] w-[24px]" />
                    <span>
                      <Skeleton className="w-[208px] max-w-full" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <SVGSkeleton className="lucide-refresh-cw h-[24px] w-[24px]" />
                    <span>
                      <Skeleton className="w-[248px] max-w-full" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6 pb-0">
                <h3 className="leading-none tracking-tight">
                  <a>
                    <Skeleton className="w-[40px] max-w-full" />
                  </a>
                </h3>
                <p>
                  <Skeleton className="w-[240px] max-w-full" />
                </p>
              </div>
              <div className="p-6 pt-0">
                <p className="mt-4">
                  <Skeleton className="w-[1608px] max-w-full" />
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <SVGSkeleton className="h-[24px] w-[24px]" />
                    <span>
                      <Skeleton className="w-[208px] max-w-full" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <SVGSkeleton className="lucide-refresh-cw h-[24px] w-[24px]" />
                    <span>
                      <Skeleton className="w-[248px] max-w-full" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6 pb-0">
                <h3 className="leading-none tracking-tight">
                  <a>
                    <Skeleton className="w-[56px] max-w-full" />
                  </a>
                </h3>
                <p>
                  <Skeleton className="w-[240px] max-w-full" />
                </p>
              </div>
              <div className="p-6 pt-0">
                <p className="mt-4">
                  <Skeleton className="w-[1416px] max-w-full" />
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <SVGSkeleton className="h-[24px] w-[24px]" />
                    <span>
                      <Skeleton className="w-[208px] max-w-full" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <SVGSkeleton className="lucide-refresh-cw h-[24px] w-[24px]" />
                    <span>
                      <Skeleton className="w-[248px] max-w-full" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6 pb-0">
                <h3 className="leading-none tracking-tight">
                  <a>
                    <Skeleton className="w-[88px] max-w-full" />
                  </a>
                </h3>
                <p>
                  <Skeleton className="w-[240px] max-w-full" />
                </p>
              </div>
              <div className="p-6 pt-0">
                <p className="mt-4">
                  <Skeleton className="w-[128px] max-w-full" />
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <SVGSkeleton className="h-[24px] w-[24px]" />
                    <span>
                      <Skeleton className="w-[216px] max-w-full" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <SVGSkeleton className="lucide-refresh-cw h-[24px] w-[24px]" />
                    <span>
                      <Skeleton className="w-[256px] max-w-full" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
