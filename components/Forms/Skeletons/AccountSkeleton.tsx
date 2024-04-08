import { Skeleton } from "@/components/Skeleton/Skeleton";

export default function AccountSkeleton() {
    return (
        <>
            <div className="max-w-2xl">
                <div className="space-y-4">
                    <div>
                        <h3>
                            <Skeleton className="w-[48px] max-w-full" />
                        </h3>
                        <p>
                            <Skeleton className="w-[696px] max-w-full" />
                        </p>
                    </div>
                    <div className="bg-border w-full h-[1px] shrink-0"></div>
                    <form className="space-y-8">
                        <div className="space-y-2">
                            <label className="leading-none">
                                <Skeleton className="w-[136px] max-w-full" />
                            </label>
                            <div className="flex border-input file:border-0 px-3 py-2 border w-full h-10">
                                <Skeleton className="w-[104px] max-w-full" />
                            </div>
                            <p>
                                <Skeleton className="w-[576px] max-w-full" />
                            </p>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="leading-none">
                                <Skeleton className="w-[152px] max-w-full" />
                            </label>
                            <div className="inline-flex justify-center items-center border-input px-4 py-2 pl-3 border w-[240px] h-10 text-left transition-colors">
                                <span>
                                    <Skeleton className="w-[136px] max-w-full" />
                                </span>
                            </div>
                            <p>
                                <Skeleton className="w-[448px] max-w-full" />
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
