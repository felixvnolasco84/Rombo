import { Skeleton, SVGSkeleton } from "@/components/Skeleton/Skeleton";

export default function SignupSkeleton() {
  return (
    <>
      <div>
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex flex-col items-start gap-2">
            <div className="relative grid h-[800px] flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
              <div className="absolute right-4 top-4 flex items-center md:right-8 md:top-8">
                <span>
                  <Skeleton className="w-[168px] max-w-full" />
                </span>
                <a className="inline-flex h-9 items-center justify-center px-3 transition-colors">
                  <Skeleton className="w-[104px] max-w-full" />
                </a>
              </div>
              <div className="relative hidden h-full flex-col p-10 dark:border-r lg:flex">
                <div className="relative z-20 flex w-fit items-center p-1">
                  <Skeleton className="w-[40px] max-w-full" />
                </div>
                <div className="relative z-20 mt-auto">
                  <blockquote className="w-fit space-y-2 p-1">
                    <p>
                      <Skeleton className="w-[2032px] max-w-full" />
                    </p>
                  </blockquote>
                </div>
              </div>
              <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                  <div className="flex flex-col space-y-2">
                    <h1 className="tracking-tight">
                      <Skeleton className="w-[112px] max-w-full" />
                    </h1>
                    <p>
                      <Skeleton className="w-[392px] max-w-full" />
                    </p>
                  </div>
                  <div className="grid gap-6">
                    <form>
                      <div className="grid gap-2">
                        <div className="grid gap-4">
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <label className="leading-none">
                              <Skeleton className="w-[48px] max-w-full" />
                            </label>
                            <div className="space-y-1">
                              <div className="flex h-10 w-full resize-none border border-input px-3 py-0 file:border-0">
                                <Skeleton className="w-[64px] max-w-full" />
                              </div>
                            </div>
                          </div>
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <label className="leading-none">
                              <Skeleton className="w-[144px] max-w-full" />
                            </label>
                            <div className="space-y-1">
                              <div className="flex h-10 w-full resize-none border border-input px-3 py-0 file:border-0">
                                <Skeleton className="w-[96px] max-w-full" />
                              </div>
                            </div>
                          </div>
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <label className="leading-none">
                              <Skeleton className="w-[80px] max-w-full" />
                            </label>
                            <div className="space-y-1">
                              <div className="flex h-10 w-full resize-none border border-input px-3 py-0 file:border-0">
                                <Skeleton className="w-[72px] max-w-full" />
                              </div>
                            </div>
                          </div>
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <label className="leading-none">
                              <Skeleton className="w-[160px] max-w-full" />
                            </label>
                            <div className="space-y-1">
                              <div className="flex h-10 w-full resize-none border border-input px-3 py-0 file:border-0">
                                <Skeleton className="w-[72px] max-w-full" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="inline-flex h-10 items-center justify-center px-4 py-2 transition-colors">
                          <Skeleton className="w-[88px] max-w-full" />
                        </div>
                      </div>
                    </form>
                    <div className="relative">
                      <div className="absolute flex items-center">
                        <span className="w-full border-t"></span>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-2">
                          <Skeleton className="w-[120px] max-w-full" />
                        </span>
                      </div>
                    </div>
                    <div className="inline-flex h-10 items-center justify-center border border-input px-4 py-2 transition-colors">
                      <Skeleton className="w-[56px] max-w-full" />
                      <SVGSkeleton className="mr-1 h-[24px] w-[24px]" />
                    </div>
                  </div>
                  <p className="px-8">
                    <Skeleton className="w-[712px] max-w-full" />
                    <a>
                      <Skeleton className="w-[120px] max-w-full" />
                    </a>
                    <a>
                      <Skeleton className="w-[184px] max-w-full" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
