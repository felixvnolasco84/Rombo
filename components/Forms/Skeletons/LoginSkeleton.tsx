import { Skeleton, SVGSkeleton } from '@/components/Skeleton/Skeleton'

export default function LoginSkeleton() {
    return (
        <>
            <main>
                <section className="items-center gap-6 grid md:py-10 pt-6 pb-8 container">
                    <div className="flex flex-col items-start gap-2">
                        <div className="relative flex-col justify-center items-center grid lg:grid-cols-2 lg:px-0 lg:max-w-none h-[800px]">
                            <div className="top-4 md:top-8 right-4 md:right-8 absolute flex items-center">
                                <span>
                                    <Skeleton className="w-[208px] max-w-full" />
                                </span>
                                <a className="inline-flex justify-center items-center px-3 h-9 transition-colors">
                                    <Skeleton className="w-[88px] max-w-full" />
                                </a>
                            </div>
                            <div className="relative lg:flex flex-col hidden p-10 dark:border-r h-full">
                                <div className="relative z-20 flex items-center p-1 w-fit">
                                    <Skeleton className="w-[40px] max-w-full" />
                                </div>
                                <div className="relative z-20 mt-auto">
                                    <blockquote className="space-y-2 p-1 w-fit">
                                        <p>
                                            <Skeleton className="w-[2032px] max-w-full" />
                                        </p>
                                    </blockquote>
                                </div>
                            </div>
                            <div className="lg:p-8">
                                <div className="flex flex-col justify-center space-y-6 mx-auto w-full sm:w-[350px]">
                                    <div className="flex flex-col space-y-2">
                                        <h1 className="tracking-tight">
                                            <Skeleton className="w-[112px] max-w-full" />
                                        </h1>
                                        <p>
                                            <Skeleton className="w-[392px] max-w-full" />
                                        </p>
                                    </div>
                                    <div className="gap-6 grid">
                                        <form>
                                            <div className="gap-2 grid">
                                                <div className="gap-4 grid">
                                                    <div className="items-center gap-1.5 grid w-full max-w-sm">
                                                        <label className="leading-none">
                                                            <Skeleton className="w-[144px] max-w-full" />
                                                        </label>
                                                        <div className="space-y-1">
                                                            <div className="flex border-input file:border-0 px-3 py-0 border w-full h-10 resize-none">
                                                                <Skeleton className="w-[96px] max-w-full" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="items-center gap-1.5 grid w-full max-w-sm">
                                                        <label className="leading-none">
                                                            <Skeleton className="w-[80px] max-w-full" />
                                                        </label>
                                                        <div className="space-y-1">
                                                            <div className="flex border-input file:border-0 px-3 py-0 border w-full h-10 resize-none">
                                                                <Skeleton className="w-[72px] max-w-full" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="inline-flex justify-center items-center px-4 py-2 h-10 transition-colors">
                                                    <Skeleton className="w-[112px] max-w-full" />
                                                </div>
                                            </div>
                                        </form>
                                        <div className="relative">
                                            <div className="absolute flex items-center">
                                                <span className="border-t w-full"></span>
                                            </div>
                                            <div className="relative flex justify-center">
                                                <span className="px-2">
                                                    <Skeleton className="w-[120px] max-w-full" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="inline-flex justify-center items-center border-input px-4 py-2 border h-10 transition-colors">
                                            <Skeleton className="w-[56px] max-w-full" />
                                            <SVGSkeleton className="mr-1 w-[24px] h-[24px]" />
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
            </main>
        </>
    )
}
