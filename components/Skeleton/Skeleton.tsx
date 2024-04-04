const Skeleton = ({ className }: { className: string }) => (
        <div aria-live="polite" aria-busy="true" className={className}>
            <span className="inline-flex bg-gray-300 rounded-md w-full leading-none animate-pulse select-none">
                ‌
            </span>
            <br />
        </div>
    )
  
const SVGSkeleton = ({ className }: { className: string }) => (
    <svg
        className={
            className + " animate-pulse rounded bg-gray-300"
        }
    />
)
  
  export { Skeleton, SVGSkeleton }