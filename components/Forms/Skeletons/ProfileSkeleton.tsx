import { Skeleton, SVGSkeleton } from "@/components/Skeleton/Skeleton";

export default function ProfileSkeleton() {
    return (
        <>
            <div className="max-w-2xl">
                <div className="space-y-6">
                    <div>
                        <h3>
                            <Skeleton className="w-[48px] max-w-full" />
                        </h3>
                        <p>
                            <Skeleton className="w-[312px] max-w-full" />
                        </p>
                    </div>
                    <div className="bg-border w-full h-[1px] shrink-0"></div>
                    <form className="space-y-1">
                        <span className="relative flex w-9 h-9 shrink-0">
                            <SVGSkeleton className="w-full h-full aspect-square" />
                        </span>
                        <div className="space-y-2">
                            <label className="leading-none">
                                <Skeleton className="w-[136px] max-w-full" />
                            </label>
                            <div className="flex border-input file:border-0 px-3 py-2 border w-full h-10">
                                <Skeleton className="w-[104px] max-w-full" />
                            </div>
                            <p>
                                <Skeleton className="w-[1008px] max-w-full" />
                            </p>
                        </div>
                        <div className="space-y-2">
                            <label className="leading-none">
                                <Skeleton className="w-[144px] max-w-full" />
                            </label>
                            <div className="flex border-input file:border-0 px-3 py-2 border w-full h-10">
                                <Skeleton className="w-[152px] max-w-full" />
                            </div>
                            <p>
                                <Skeleton className="w-[848px] max-w-full" />
                                <a>
                                    <Skeleton className="w-[280px] max-w-full" />
                                </a>
                            </p>
                        </div>
                        <div className="inline-flex justify-center items-center px-4 py-2 h-10 transition-colors">
                            <Skeleton className="w-[136px] max-w-full" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
